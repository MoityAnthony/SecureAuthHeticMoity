import express from 'express';
import { loginUser, register, verify2FA } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/register', register, (req, res) => {
  res.status(200).json({ message: 'Register successful' });
});
router.post('/login', loginUser, (req, res) => {
  res.status(200).json({ message: 'Login successful' });
});
router.post('/verify-2fa', verify2FA, (req, res) => {
  res.status(200).json({ message: 'Verify2FA successful' });
});
router.post('/logout', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

export default router;