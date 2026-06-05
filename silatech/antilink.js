const { isJidGroup } = require('@whiskeysockets/baileys');
const { cmd } = require('../momy');   // Tumia command handler yako
const config = require('../config');
const isAdmin = require('../lib/isAdmin');  // Adjust path

// Store antilink settings per group
let antilinkSettings = new Map();

async function getSetting(jid) {
  return antilinkSettings.get(jid) || { enabled: false, action: 'delete', warnCount: 3 };
}

async function setSetting(jid, data) {
  const cur = await getSetting(jid);
  antilinkSettings.set(jid, { ...cur, ...data });
}

// Auto antilink function (called from message handler)
async function AntilinkAuto(msg, sock) {
  const jid = msg.key.remoteJid;
  if (!isJidGroup(jid)) return;
  const setting = await getSetting(jid);
  if (!setting.enabled) return;

  const text = msg.message?.conversation ||
               msg.message?.extendedTextMessage?.text ||
               msg.message?.imageMessage?.caption ||
               '';
  if (!text) return;

  // Simple URL detection
  const urlRegex = /(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?/i;
  if (!urlRegex.test(text)) return;

  const sender = msg.key.participant || msg.key.remoteJid;
  if (!sender) return;

  // Skip admin and sudo
  try {
    const { isSenderAdmin } = await isAdmin(sock, jid, sender);
    if (isSenderAdmin) return;
  } catch (_) {}
  const sudoNumbers = config.SUDO_NUMBERS || [];
  if (sudoNumbers.includes(sender.split('@')[0])) return;

  // Delete the message
  await sock.sendMessage(jid, { delete: msg.key });

  // Take action
  const action = setting.action;
  if (action === 'delete') {
    await sock.sendMessage(jid, { text: `🔗 @${sender.split('@')[0]} viungo hairuhusiwi!`, mentions: [sender] });
  } else if (action === 'warn') {
    // simple warn (you can implement counter)
    await sock.sendMessage(jid, { text: `⚠️ @${sender.split('@')[0]} onyo! usitume viungo.`, mentions: [sender] });
  } else if (action === 'kick') {
    await sock.groupParticipantsUpdate(jid, [sender], 'remove');
    await sock.sendMessage(jid, { text: `🥾 @${sender.split('@')[0]} amefukuzwa kwa kutuma link.`, mentions: [sender] });
  } else if (action === 'mute') {
    // Mute simulation: just warn, or implement group setting
    await sock.sendMessage(jid, { text: `🔇 @${sender.split('@')[0]} umenyamazishwa kwa dakika 5.`, mentions: [sender] });
  }
}

// ========== ANTILINK COMMAND (ITAONEKANA KWENYE MENU) ==========
cmd({
  pattern: "antilink",
  alias: ["antiurl", "linkguard"],
  category: "group",     // ← Hii itaifanya ionekane chini ya "GROUP"
  desc: "Zuia viungo kwenye group (on/off/action)",
  use: ".antilink <on/off/action/warncount>",
  filename: __filename
}, async (conn, mek, m, { from, args, reply, sender }) => {
  if (!isJidGroup(from)) return reply("Command hii ni kwa group pekee.");
  
  // Check if sender is admin (optional, you can skip but recommended)
  try {
    const { isSenderAdmin } = await isAdmin(conn, from, sender);
    if (!isSenderAdmin) return reply("Wewe si admin wa group hili.");
  } catch (_) {}

  const setting = await getSetting(from);
  if (!args[0]) {
    let status = setting.enabled ? "✅ IMEWASHWA" : "❌ IMELETWA";
    return reply(`📌 *ANTILINK CONFIG*\nStatus: ${status}\nAction: ${setting.action}\nWarnCount: ${setting.warnCount}`);
  }

  const sub = args[0].toLowerCase();
  if (sub === "on") {
    await setSetting(from, { enabled: true });
    reply("✅ Antilink imewashwa. Viungo vitachukuliwa hatua.");
  } else if (sub === "off") {
    await setSetting(from, { enabled: false });
    reply("❌ Antilink imezimwa.");
  } else if (sub === "action") {
    const newAction = args[1];
    if (!newAction || !['delete', 'warn', 'kick', 'mute'].includes(newAction)) {
      return reply("Njia: delete / warn / kick / mute");
    }
    await setSetting(from, { action: newAction });
    reply(`✅ Action imebadilishwa kuwa: ${newAction}`);
  } else if (sub === "warncount") {
    const count = parseInt(args[1]);
    if (isNaN(count) || count < 1) return reply("Weka namba sahihi (mfano: 3)");
    await setSetting(from, { warnCount: count });
    reply(`✅ Warn count imewekwa: ${count}`);
  } else {
    reply("Njia: on / off / action / warncount");
  }
});

// Export auto function for use in main message handler
module.exports = { AntilinkAuto };
