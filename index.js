const TelegramBot = require("node-telegram-bot-api")

const token = process.env.BOT_TOKEN

const bot = new TelegramBot(token, { polling: true })

// ===============================
// MESSAGE START
// ===============================

bot.onText(/\/start/, (msg) => {

const chatId = msg.chat.id

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
`

bot.sendMessage(chatId, welcome, {
reply_markup: {
inline_keyboard: [

[{ text: "📊 Voir les pronostics", callback_data: "categories" }],

[{ text: "💰 Mon solde", callback_data: "balance" }],

[{ text: "📩 Nous contacter", url: "https://t.me/tonusername" }]

]
}
})

})

// ===============================
// CALLBACK MENU
// ===============================

bot.on("callback_query", (query) => {

const chatId = query.message.chat.id
const data = query.data

// ===============================
// CATEGORIES
// ===============================

if (data === "categories") {

bot.sendMessage(chatId,
"📊 Choisissez une catégorie de pronostics :",
{
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
})

}

// ===============================
// SPORT
// ===============================

if (data === "sport") {

bot.sendMessage(chatId,
`⚽ Pronostics Sport

Exemple :

Le PSG gagnera-t-il son prochain match ?

🟢 Oui
🔴 Non`
)

}

// ===============================
// DIVERTISSEMENT
// ===============================

if (data === "entertainment") {

bot.sendMessage(chatId,
`🎬 Pronostics Divertissement

Exemple :

Ce film dépassera-t-il 500M$ au box office ?`
)

}

// ===============================
// WEB
// ===============================

if (data === "web") {

bot.sendMessage(chatId,
`🌐 Pronostics Web

Exemple :

Cette startup atteindra-t-elle 1M d'utilisateurs ?`
)

}

// ===============================
// POLITIQUE
// ===============================

if (data === "politics") {

bot.sendMessage(chatId,
`🏛 Pronostics Politique

Exemple :

Ce candidat remportera-t-il l'élection ?`
)

}

// ===============================
// GAMING
// ===============================

if (data === "gaming") {

bot.sendMessage(chatId,
`🎮 Pronostics Gaming

Exemple :

Ce jeu dépassera-t-il 10M de ventes ?`
)

}

// ===============================
// SOLDE
// ===============================

if (data === "balance") {

bot.sendMessage(chatId,
"💰 Votre solde ZELTRA sera bientôt disponible."
)

}

// ===============================
// RETOUR MENU
// ===============================

if (data === "menu") {

bot.sendMessage(chatId,
"🏠 Menu principal",
{
reply_markup: {
inline_keyboard: [

[{ text: "📊 Voir les pronostics", callback_data: "categories" }],

[{ text: "💰 Mon solde", callback_data: "balance" }],

[{ text: "📩 Nous contacter", url: "https://t.me/tonusername" }]

]
}
})

}

bot.answerCallbackQuery(query.id)

})

console.log("ZELTRAMARKET bot lancé 🚀")
