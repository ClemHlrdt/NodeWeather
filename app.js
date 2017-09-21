const weather = require('./weather.js');
const temps = process.argv.slice(2);

weather.get(temps);
