const { CronJob } = require('cron');
const whoIsHome = require('./whoIsHome');
const config = require('../config.json');

const scheduleJobs = users => {
  // Add 1 consumed
  config.userAtHomeEvents.forEach(atHomeEvent => {
    const consuming = new CronJob(
      atHomeEvent.schedule,
      async () => {
        const usersAtHome = await whoIsHome();
        if (usersAtHome) {
          usersAtHome.forEach(userAtHome => {
            users.update({ id: userAtHome.id }, { $inc: atHomeEvent.update });
          });
        }
      },
      null,
      null,
      config.timeZone
    );
    consuming.start();
  });
};

module.exports = scheduleJobs;
