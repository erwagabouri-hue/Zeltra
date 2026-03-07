const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

// URL de la mini app (celle déployée sur Vercel)
const WEBAPP_URL = "https://zeltra-nu.vercel.app";

bot.onText(/\/start/, (msg) => {

const chatId = msg.chat.id;

bot.sendMessage(
chatId,
"🚀 Bienvenue sur ZELTRAMARKET\n\nZeltraMarket est la première plateforme française de pronostics sur des faits réels.\n\nToutes les mises sont réalisées avec le jeton ZELTRA.\n\nClique ci-dessous pour ouvrir la plateforme.",
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

console.log("Bot ZeltraMarket lancé 🚀");
