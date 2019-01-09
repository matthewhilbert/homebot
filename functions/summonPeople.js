const whoIsHome = require('./whoIsHome');

const summonPeople = async client => {
  const usersAtHome = await whoIsHome();
  usersAtHome.forEach(user => {
    if (user.discordUserId && client.users.get(user.discordUserId)) {
      client.users.get(user.discordUserId).send("C'mon down!");
    }
  });
};

module.exports = summonPeople;
