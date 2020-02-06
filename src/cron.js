const cron = require('node-cron');
const fetch = require('./index');


cron.schedule('* 18 * * Monday-Friday', () => {
    fetch();
});