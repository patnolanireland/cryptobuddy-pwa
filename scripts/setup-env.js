var argv = require('yargs').argv;
var fs = require('fs');

if(argv.prod || argv.production) {
  argv.env = 'prod';
  console.log('PROD is now the active ENV');
} else if(argv.uat) {
  argv.env = 'uat';
  console.log('UAT is now the active ENV');
} else {
  console.log('DEV is now the active ENV');
}

const onError = (err) => console.error(err);

const read$ = fs.createReadStream(`src/config/${argv.env || 'default'}.json`).on('error', onError);

const write$ = fs.createWriteStream('src/config/active-config.json', { encoding: 'utf-8' }).on('error', onError);

read$.pipe(write$);

