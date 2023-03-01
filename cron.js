const cron = require('node-cron');
const api = require('./src/pages/api/api');

// Ejecuta la función cada hora
cron.schedule('0 * * * *', () => {
    api.teams.fetchFiveRandomTeams();
});