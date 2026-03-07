/**
 * ZELTRAMARKET Telegram Bot
 * Plateforme de pronostics sur des faits réels
 * Mises réalisées en jeton ZELTRA
 */

const TelegramBot = require("node-telegram-bot-api");

// =========================
// CONFIGURATION
// =========================

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN manquant dans les variables d'environnement.");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// =========================
// BASE DE DONNÉES SIMPLE (MVP)
// =========================

const users = {};
const markets = [
  {
    id: 1,
    question: "Le Bitcoin dépassera-t-il 100 000$ avant 2027 ?",
    yes: 0,
    no: 0,
    status: "open"
  },
  {
    id: 2,
    question: "L'équipe de France gagnera-t-elle son prochain match ?",
    yes: 0,
    no: 0,
    status: "open"
  }
];

// =========================
// UTILITAIRES
// =========================

function getUser(userId) {
  if (!users[userId]) {
    users[userId] = {
      balance: 1000,
      bets: []
    };
  }
  return users[userId];
}

function mainMenu() {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📊 Voir les pronostics", callback_data: "markets" }],
        [{ text: "💰 Mon solde", callback_data: "balance" }],
        [{ text: "📜 Mes paris", callback_data: "bets" }],
        [{ text: "📩 Nous contacter", url: "https://t.me/tonusername" }]
      ]
    }
  };
}

// =========================
// COMMANDE START
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

  bot.sendMessage(chatId, welcome, mainMenu());
});

// =========================
// CALLBACK MENU
// =========================

bot.on("callback_query", (query) => {

  const chatId = query.message.chat.id;
  const userId = query.from.id;
  const data = query.data;

  const user = getUser(userId);

  // =====================
  // VOIR LES PRONOSTICS
  // =====================

  if (data === "markets") {

    markets.forEach((market) => {

      if (market.status !== "open") return;

      bot.sendMessage(chatId,
        `📊 Pronostic #${market.id}\n\n${market.question}\n\n🟢 Oui : ${market.yes}\n🔴 Non : ${market.no}`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "🟢 Parier OUI", callback_data: `bet_yes_${market.id}` },
                { text: "🔴 Parier NON", callback_data: `bet_no_${market.id}` }
              ]
            ]
          }
        }
      );

    });

  }

  // =====================
  // SOLDE
  // =====================

  if (data === "balance") {

    bot.sendMessage(chatId,
      `💰 Votre solde : ${user.balance} ZELTRA`
    );

  }

  // =====================
  // HISTORIQUE DES PARIS
  // =====================

  if (data === "bets") {

    if (user.bets.length === 0) {

      bot.sendMessage(chatId,
        "📜 Vous n'avez encore placé aucun pari."
      );

      return;
    }

    let message = "📜 Vos paris :\n\n";

    user.bets.forEach((bet) => {

      message += `Pronostic ${bet.marketId} → ${bet.choice} (${bet.amount} ZELTRA)\n`;

    });

    bot.sendMessage(chatId, message);

  }

  // =====================
  // PARIER
  // =====================

  if (data.startsWith("bet_yes_") || data.startsWith("bet_no_")) {

    const parts = data.split("_");
    const choice = parts[1];
    const marketId = parseInt(parts[2]);

    const market = markets.find(m => m.id === marketId);

    if (!market) {
      bot.sendMessage(chatId, "❌ Pronostic introuvable.");
      return;
    }

    const betAmount = 100;

    if (user.balance < betAmount) {
      bot.sendMessage(chatId, "❌ Solde insuffisant.");
      return;
    }

    user.balance -= betAmount;

    user.bets.push({
      marketId,
      choice,
      amount: betAmount
    });

    if (choice === "yes") market.yes += betAmount;
    if (choice === "no") market.no += betAmount;

    bot.sendMessage(chatId,
      `✅ Pari enregistré !

📊 Pronostic : ${market.question}
🎯 Choix : ${choice.toUpperCase()}
💰 Mise : ${betAmount} ZELTRA

Nouveau solde : ${user.balance} ZELTRA`
    );

  }

  bot.answerCallbackQuery(query.id);

});

// =========================
// GESTION ERREURS
// =========================

bot.on("polling_error", (error) => {
  console.error("Polling error:", error);
});

console.log("🚀 ZeltraMarket bot lancé");
