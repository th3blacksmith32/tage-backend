import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start(.*)/, (msg, match) => {
  const startParam = match[1]?.trim();

  bot.sendMessage(msg.chat.id, 'Welcome to $TAGE!', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: 'Open $TAGE',
          web_app: {
            url: `https://yourdomain.com?start=${startParam || ''}`
          }
        }
      ]]
    }
  });
});
