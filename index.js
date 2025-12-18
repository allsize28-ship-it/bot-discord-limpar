require('dotenv').config();
const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`🤖 Bot online como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!limpar')) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.reply('❌ Você não tem permissão para apagar mensagens.');
    }

    const quantidade = parseInt(message.content.split(' ')[1]);

    if (!quantidade || quantidade < 1 || quantidade > 100) {
      return message.reply('⚠️ Use: !limpar 1-100');
    }

    await message.channel.bulkDelete(quantidade + 1, true);
    const aviso = await message.channel.send(`🧹 ${quantidade} mensagens apagadas.`);
    setTimeout(() => aviso.delete(), 3000);
  }
});

client.login(process.env.TOKEN);
