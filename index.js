const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const app = express();

const WEBAPP_URL = "https://zeltra-47xg5qhmc-erwagabouri-hues-projects.vercel.app/";


// =======================
// SERVER POUR RENDER
// =======================

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
res.send("ZeltraMarket Bot is running 🚀");
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});


// =======================
// START COMMAND
// =======================

bot.onText(/\/start/, (msg) => {

const chatId = msg.chat.id;

const welcome = `
🚀 Bienvenue sur ZELTRAMARKET

ZeltraMarket est la première plateforme française de pronostics sur des faits réels et quotidiens.

Chaque jour, de nouvelles prédictions sont disponibles :

📊 Actualité
⚽ Sport
🌍 Événements mondiaux
📈 Crypto et marchés

🪙 Toutes les mises sont réalisées avec le jeton ZELTRA.

Bonne chance 🍀
`;

bot.sendMessage(chatId, welcome, {

reply_markup: {

inline_keyboard: [

[
{
text:"📱 Ouvrir ZeltraMarket",
web_app:{url:WEBAPP_URL}
}
],

[{text:"📊 Voir les pronostics",callback_data:"categories"}],

[{text:"💰 Mon solde",callback_data:"balance"}],

[{text:"📩 Nous contacter",url:"https://t.me/tonusername"}]

]

}

});

});


// =======================
// CALLBACK
// =======================

bot.on("callback_query",(query)=>{

const chatId=query.message.chat.id;
const data=query.data;

if(data==="categories"){

bot.sendMessage(chatId,"📊 Choisissez une catégorie :",{

reply_markup:{
inline_keyboard:[

[{text:"⚽ Sport",callback_data:"sport"}],

[{text:"🎬 Divertissement",callback_data:"entertainment"}],

[{text:"🌐 Web",callback_data:"web"}],

[{text:"🏛 Politique",callback_data:"politics"}],

[{text:"🎮 Gaming",callback_data:"gaming"}]

]
}

});

}

if(data==="balance"){

bot.sendMessage(chatId,"💰 Fonction bientôt disponible");

}

bot.answerCallbackQuery(query.id);

});

console.log("ZeltraMarket bot running 🚀");
