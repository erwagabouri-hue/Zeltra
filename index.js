const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const app = express();

const PORT = process.env.PORT || 3000;

const WEBAPP_URL = "https://zeltra-47xg5qhmc-erwagabouri-hues-projects.vercel.app/";


app.get("/", (req, res) => {
res.send("ZeltraMarket bot running 🚀");
});

app.listen(PORT, () => {
console.log("Server running on port " + PORT);
});


// START

bot.onText(/\/start/, (msg) => {

const chatId = msg.chat.id;

const welcome = `
🚀 Bienvenue sur ZELTRAMARKET

ZeltraMarket est la première plateforme française de pronostics sur des faits réels et quotidiens.

Toutes les mises sont réalisées avec le jeton ZELTRA.

Cliquez ci-dessous pour ouvrir la plateforme.
`;

bot.sendMessage(chatId, welcome, {

reply_markup: {

inline_keyboard: [

[
{
text: "📱 Ouvrir la plateforme Zeltra",
web_app: { url: WEBAPP_URL }
}
]

]

}

});

});

console.log("ZeltraMarket bot launched 🚀");
