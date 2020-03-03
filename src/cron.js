const cron = require('node-cron');
const fetch = require('./index');

cron.schedule('0 18 * * Monday-Friday', () => {
    console.log('Starting schedule');
    fetch();
});