require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  if (message.author.bot) return; // Ignore bot messages
  const args = message.content.split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.channel.send('pong...').then((msg) => {
      msg.edit(`pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}`);
    });
  }
});

client.login(process.env.BOT_TOKEN);
