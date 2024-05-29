import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.db');

export const addUser = (username, password, secret, callback) => {
  const query = "INSERT INTO users (username, password, secret) VALUES (?, ?, ?)";
  db.run(query, [username, password, secret], function(err) {
    if (err) {
      callback(err);
    } else {
      const userId = this.lastID;
      callback(null, userId);
    }
  });
};

export const getUserByUsername = (username, callback) => {
  const query = "SELECT * FROM users WHERE username = ?";
  db.get(query, [username], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};