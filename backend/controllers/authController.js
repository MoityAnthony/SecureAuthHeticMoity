import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import dotenv from "dotenv";
import { addUser, getUserByUsername } from '../models/userModel.js';
import PasswordValidator from 'password-validator';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const generateToken = (user) => {
  return jwt.sign({ username: user.username, id: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

export const register = async (req, res) => {
  const {username, password} = req.body;

  const schema = new PasswordValidator();
  schema
    .is().min(8)
    .is().max(100)
    .has().uppercase(1)
    .has().lowercase(1)
    .has().digits(1)
    .has().symbols(1);

  const validationErrors = [];

  if (!schema.validate(password)) {
    if (!schema.has().min(8).validate(password)) {
      validationErrors.push(" 8 characters min");
    }
    if (!schema.has().uppercase(1).validate(password)) {
      validationErrors.push(" one uppercase letter");
    }
    if (!schema.has().lowercase(1).validate(password)) {
      validationErrors.push(" one lowercase letter");
    }
    if (!schema.has().digits(1).validate(password)) {
      validationErrors.push(" one digit");
    }
    if (!schema.has().symbols(1).validate(password)) {
      validationErrors.push(" one symbol.");
    }
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({ message: "Password validation failed.", errors: validationErrors });
  }

  if (!schema.validate(password)) {
    return res.status(400).json({ message: "Password does not meet requirements.", errors: validationErrors });
  }

  if(!username && !password){
    return res.status(400).json({message: "Please fill in all fields"});
  }

  try {
    getUserByUsername(username, async (err, existingUser) => {
      if (err) {
        console.error('Error checking existing user:', err);
        return res.status(500).json({ message: "Registration failed. Please try again. getUserByUserName" });
      }
      
      if (existingUser) {
        return res.status(409).json({ message: "User already exists. Please proceed to login." });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const secret = speakeasy.generateSecret({ length: 20, step: 60 }).base32;
      
      addUser(username, hashedPassword, secret, (err, userId) => {
        if (err) {
          console.error('Error adding new user:', err);
          return res.status(500).json({ message: "Registration failed. Please try again. addUser" });
        }

        const token = jwt.sign({ username, id: userId }, ACCESS_TOKEN_SECRET);
        
        res.status(201).json({ token });
      });
    });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: "Registration failed. Please try again. All" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    getUserByUsername(username, (err, user) => {
      if (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ message: "An error occurred. Please try again." });
      }

      if (!user) {
        return res.status(401).json({ message: "Invalid username or password." });
      }

      bcrypt.compare(password, user.password, (err, validPassword) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ message: "An error occurred. Please try again." });
        }

        if (!validPassword) {
          return res.status(401).json({ message: "Invalid username or password." });
        }

        const token = generateToken(user);

        const otpAuthUrl = `otpauth://totp/SecureAuthHeticMoity:${username}?secret=${user.secret}&issuer=SecureAuthHeticMoity`;

        res.status(200).json({ token, qrCodeUrl: otpAuthUrl, secret: user.secret, user: { username: user.username, email: user.email } });
      });
    });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
};

export const verify2FA = async (req, res) => {
  const { verificationCode, secret } = req.body;

  if (!verificationCode || !secret) {
    return res.status(400).json({ message: "Verification code and secret are required." });
  }

  try {
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: verificationCode
    });

    if (!verified) {
      return res.status(401).json({ message: "Invalid verification code." });
    }

    const token = jwt.sign({ verificationCode }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('2FA verification failed:', error);
    res.status(500).json({ message: "2FA verification failed. Please try again." });
  }
};