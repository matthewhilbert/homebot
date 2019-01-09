require('dotenv').config();
const Discord = require('discord.js');
const Datastore = require('nedb');
const express = require('express');
const whoIsHome = require('./functions/whoIsHome');
const summonPeople = require('./functions/summonPeople');
const initializeUsers = require('./functions/initializeUsers');
const scheduleJobs = require('./functions/scheduleJobs');
const config = require('./config.json');

const app = express();
const { port } = config;

const users = new Datastore({ filename: 'data/users.db', autoload: true });
initializeUsers(users);
scheduleJobs(users);

const client = new Discord.Client();

client.on('ready', async () => {
  console.log('Homebot: I am ready!');
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
    summonPeople(client);
  }
});

client.login(process.env.BOT_TOKEN);

app.get('/summon-people', async (req, res) => {
  summonPeople(client);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`API listening on port ${port}`));
