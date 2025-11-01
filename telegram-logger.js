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
  let message = `<b>🔔 ${type.toUpperCase()}</b>\n`;
  message += `<b>Time:</b> ${timestamp}\n`;
  message += `<b>Data:</b>\n<pre>${JSON.stringify(data, null, 2)}</pre>`;
  
  sendToTelegram(message);
}

module.exports = {
  sendToTelegram,
  logToTelegram
};
