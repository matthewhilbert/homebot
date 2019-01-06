const config = require('../config.json');

async function initializeUsers(db) {
  const userCount = config.users.length;
  for (let i = 0; i < userCount; i += 1) {
    const userToAdd = config.users[i];

    // Update user with data in config.json if user exists, otherwise create it
    db.update({ id: userToAdd.id }, { $set: { ...userToAdd } }, { returnUpdatedDocs: true, upsert: true });
  }
}

module.exports = initializeUsers;
