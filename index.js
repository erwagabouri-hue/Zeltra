const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const WEBAPP_URL = "https://zeltra-47xg5qhmc-erwagabouri-hues-projects.vercel.app/";


// =========================
// START
// =========================

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

Choisissez votre prédiction, placez votre mise et suivez les résultats en temps réel.

Bonne chance 🍀
`;

bot.sendMessage(chatId, welcome, {

reply_markup: {

inline_keyboard: [

[
{
text: "📱 Ouvrir la plateforme Zeltra",
web_app: { url: WEBAPP_URL }
}
],

[
{ text: "📊 Pronostics", callback_data: "categories" }
],

[
{ text: "💰 Mon solde", callback_data: "balance" }
],

[
{ text: "📩 Nous contacter", url: "https://t.me/tonusername" }
]

]

}

});

});


// =========================
// CALLBACK
// =========================

bot.on("callback_query", (query) => {

const chatId = query.message.chat.id;
const data = query.data;


// =========================
// CATEGORIES
// =========================

if (data === "categories") {

bot.sendMessage(chatId, "📊 Choisissez une catégorie :", {

reply_markup: {

inline_keyboard: [

[{ text: "⚽ Sport", callback_data: "sport" }],

[{ text: "🎬 Divertissement", callback_data: "entertainment" }],

[{ text: "🌐 Web", callback_data: "web" }],

[{ text: "🏛 Politique", callback_data: "politics" }],

[{ text: "🎮 Gaming", callback_data: "gaming" }],

[{ text: "⬅ Retour", callback_data: "menu" }]

]

}

});

}


// =========================
// SOLDE
// =========================

if (data === "balance") {

bot.sendMessage(chatId, "💰 Votre solde ZELTRA sera bientôt disponible.");

}


// =========================
// MENU
// =========================

if (data === "menu") {

bot.sendMessage(chatId, "🏠 Menu principal", {

reply_markup: {

inline_keyboard: [

[
{
text: "📱 Ouvrir la plateforme Zeltra",
web_app: { url: WEBAPP_URL }
}
],

[
{ text: "📊 Pronostics", callback_data: "categories" }
],

[
{ text: "💰 Mon solde", callback_data: "balance" }
]

]

}

});

}

bot.answerCallbackQuery(query.id);

});


console.log("🚀 ZeltraMarket bot lancé");
