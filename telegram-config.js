// telegram-config.js
module.exports = {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN_HERE',
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || '7303596375',
    
    // Telegram bot settings - updated to D4rkEcho MD
    TELEGRAM_BOT_NAME: 'D4rkEcho MD',
    TELEGRAM_BOT_USERNAME: 'D4rkEcho_MD_bot', // ilibadilishwa kuepuka mgongano
    
    // Webhook settings (optional)
    TELEGRAM_WEBHOOK_URL: process.env.TELEGRAM_WEBHOOK_URL || null,
    TELEGRAM_WEBHOOK_PORT: process.env.TELEGRAM_WEBHOOK_PORT || 3001,
    
    // Database for Telegram sessions - folder tofauti kuepuka migogoro
    TELEGRAM_SESSION_PATH: './database/telegram-sessions/', // Hakikisha folder hii ipo na ina ruhusa za kuandika
    
    // Commands - zimeongezwa pair na status
    COMMANDS: [
        { command: 'start', description: 'Anzisha D4rkEcho MD bot' },
        { command: 'pair', description: 'Oanisha namba yako ya WhatsApp' },
        { command: 'owner', description: 'Wasiliana na mmiliki' },
        { command: 'menu', description: 'Orodha ya amri zote' },
        { command: 'status', description: 'Angalia hali ya bot na sesheni' },
        { command: 'help', description: 'Maelezo ya usaidizi' },
        { command: 'clean', description: 'Futa historia ya makundi (group history)' } // Amri mpya ya kusafisha
    ],
    
    // Messages - zimebadilishwa kwa D4rkEcho MD
    MESSAGES: {
        WELCOME: `🤖 *D4rkEcho MD PAIRING SYSTEM* 🤖\n\n👋 Karibu kwenye mfumo wa kuoanisha D4rkEcho MD WhatsApp bot!\n\nTumia /pair <namba> kuunganisha bot yako.\n\n📢 Chaneli yetu: t.me/D4rkEcho_MD (itakuja hivi karibuni)`,
        HELP: `📚 *ORODHA YA AMRI - D4rkEcho MD*\n\n/start - Anzisha bot\n/pair <namba> - Oanisha namba ya WhatsApp\n/owner - Wasiliana na mmiliki\n/menu - Orodha kamili ya amri\n/status - Angalia hali ya bot\n/help - Msaada huu\n/clean - Futa historia ya makundi na ujumbe uliofutwa\n\n⚠️ *Tahadhari:* Bot haitaingiliana na sesheni zingine. Hakikisha unatumia namba moja kwa wakati mmoja.`,
        OWNER: `👑 *MMILIKI WA D4rkEcho MD*\n\n📛 Jina: JAMALI TECH TZ\n📞 Namba: +255 618 313 342\n\n🔗 Telegram: @D4rkEcho_Owner\n📢 Channel: https://t.me/D4rkEcho_MD`
    },
    
    // URLs - umeongezwa newsletter channel uliyotaja
    URLS: {
        GITHUB: 'https://github.com/D4rkEcho/D4rkEcho-MD', // Badilisha link halisi kama unayo
        TELEGRAM_CHANNEL: 'https://t.me/D4rkEcho_MD',
        TELEGRAM_GROUP: 'https://t.me/D4rkEcho_group',
        WHATSAPP_CHANNEL: 'https://whatsapp.com/channel/0029VbC7AgJK5cD71vGIpO3h', // Hii ni ya zamani, unaweza kubadilisha
        SUPPORT_GROUP: 'https://chat.whatsapp.com/GPdlJ8ip88K39E5Hok7rJh',
        // Chaneli ya newsletter uliyotaja - tumia hii JID kwenye bot yako
        NEWSLETTER_JID: '120363426538840090@newsletter'
    },
    
    // Mipangilio ya usalama wa sesheni - kuzuia migogoro
    SESSION_CONFIG: {
        // Kila namba itakuwa na faili lake la session tofauti
        USE_MULTI_SESSION: true,
        // Futa session baada ya siku 7 za kutotumika (hiari)
        SESSION_EXPIRY_DAYS: 7,
        // Ruhusu session moja tu kwa wakati
        SINGLE_SESSION_PER_NUMBER: true
    }
};
