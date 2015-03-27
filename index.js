var chalk = require('chalk'),
    fs = require('fs'),
    _ = require('underscore'),
    shell = require('shelljs');

var argv = require('minimist')(process.argv.slice(2)),
    config = fs.readFileSync('./config.json');

try {
    config = JSON.parse(config.toString());
} catch(e) {
    return new Error('Error parsing config file.');
}

var category = argv.category || 'materials',
    url = config.lodestone_root_url;

console.log(chalk.magenta('Starting Lodestone scrape for %s ...'), category);

var result = shell.exec('casperjs ./src/casper_init.js --url=' + url + ' --category=' + config.category2[category]);

console.log(chalk.magenta('Done!'));