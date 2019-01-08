require('dotenv').config();
const Discord = require('discord.js');
const Datastore = require('nedb');
const whoIsHome = require('./functions/whoIsHome');
const initializeUsers = require('./functions/initializeUsers');
const scheduleJobs = require('./functions/scheduleJobs');

const users = new Datastore({ filename: 'data/users.db', autoload: true });
initializeUsers(users);
scheduleJobs(users);

const client = new Discord.Client();

client.on('ready', async () => {
  console.log('I am ready!');
});

client.on('message', async message => {
  if (message.author.bot) return; // Ignore bot messages

  if (message.content === 'ping') {
    message.channel.send('pong...').then(msg => {
      msg.edit(
        `pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(
          client.ping
        )}`
      );
    });
  }

  if (message.content.toLowerCase().startsWith('who is home')) {
    const usersAtHome = await whoIsHome();
    message.channel.send(usersAtHome.map(u => u.name).join(', '));
  }

  if (message.content.toLowerCase().startsWith('summon')) {
    const usersAtHome = await whoIsHome();
    usersAtHome.forEach(user => {
      if (user.discordUserId) {
        client.users.get(user.discordUserId).send("C'mon down!");
      }
    });
  }
});

client.login(process.env.BOT_TOKEN);
