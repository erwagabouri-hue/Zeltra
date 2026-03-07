const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

const WEBAPP_URL = "https://zeltra-nu.vercel.app";

bot.onText(/\/start/, (msg) => {

const chatId = msg.chat.id;

bot.sendMessage(chatId,
"🚀 Bienvenue sur ZELTRAMARKET\n\nLa première plateforme française de pronostics sur des faits réels.\n\nToutes les mises se font avec le jeton ZELTRA.\n\nClique ci-dessous pour ouvrir la plateforme.",
{
reply_markup:{
inline_keyboard:[
[
{
text:"📱 Ouvrir la plateforme Zeltra",
web_app:{ url: WEBAPP_URL }
}
]
]
}
});

});
