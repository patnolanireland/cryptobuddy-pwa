var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./src/config/active-config.json', 'utf8'));

console.log(`ACTIVE ENVIRONMENT IS ${config.environment}`);
console.log('#################################################################');
