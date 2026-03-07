const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {

const chatId = msg.chat.id;

const welcomeMessage = `
🚀 Bienvenue sur ZELTRAMARKET

ZeltraMarket est la première plateforme française de pronostics sur des faits réels et quotidiens.

Chaque jour, de nouvelles prédictions sont disponibles :

📊 Actualité  
⚽ Sport  
🌍 Événements mondiaux  
📈 Crypto et marchés  

🪙 Toutes les mises sont réalisées avec le jeton ZELTRA.

Choisissez votre prédiction, placez votre mise et suivez les résultats en temps réel.

Bonne chance 🍀
`;

const options = {
reply_markup: {
inline_keyboard: [
[
{ text: "📊 Voir les pronostics", callback_data: "markets" }
],
[
{ text: "💰 Mon solde", callback_data: "balance" }
],
[
{ text: "📩 Nous contacter", url: "https://t.me/tonusername" }
]
]
}
};

bot.sendMessage(chatId, welcomeMessage, options);

});

bot.on("callback_query", (query) => {

const chatId = query.message.chat.id;

if (query.data === "markets") {

bot.sendMessage(chatId, "📊 Les pronostics arrivent bientôt sur ZeltraMarket.");

}

if (query.data === "balance") {

bot.sendMessage(chatId, "💰 Votre solde ZELTRA sera disponible prochainement.");

}

bot.answerCallbackQuery(query.id);

});
