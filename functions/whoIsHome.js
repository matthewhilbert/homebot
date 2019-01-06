const find = require('lodash/find');
const hassApi = require('../hassApi');
const config = require('../config.json');

async function getHassStates() {
  try {
    const response = await hassApi.get('states');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function whoIsHome() {
  const hassEntityIds = config.users.map(user => user.hassEntityId);
  const hassStates = await getHassStates();
  const hassUserStates = hassStates.filter(state => hassEntityIds.includes(state.entity_id));
  const usersAtHomeEntityIds = hassUserStates.filter(s => s.state === 'home').map(s => s.entity_id);

  const usersAtHome = usersAtHomeEntityIds.map(id => find(config.users, { hassEntityId: id }).name);
  return usersAtHome;
}

module.exports = whoIsHome;
