"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = require("node-telegram-bot-api");
const bot = new node_telegram_bot_api_1.default(process.env.BOT_TOKEN, { polling: true });
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
