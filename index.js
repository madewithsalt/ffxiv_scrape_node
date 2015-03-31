var chalk = require('chalk'),
    fs = require('fs'),
    childProcess = require('child_process'),
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
    pages = argv.pages,
    url = config.lodestone_root_url;

console.log(chalk.magenta('Starting Lodestone scrape for %s ...'), category);

var options = ' --url=' + url + ' --category=' + config.category2[category];

if(pages) {
    options += ' --pages=' + pages;
}

// how many pages to traverse and collect data
shell.exec('casperjs ./src/casper_init.js' + options);