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

var category1 = argv.category1 || 'item',
    category2 = argv.category2,
    category3 = argv.category3,
    pages = argv.pages,
    url = config.lodestone_root_url;

console.log(chalk.magenta('Starting Lodestone scrape for %s ...'), category1);

if(category2) {
  console.log(chalk.magenta('targeting %s subcategory:'), category2);
}

var options = ' --url=' + url + ' --category1=' + category1;

if(pages) {
    options += ' --pages=' + pages;
}

if(category2) {
  url += ' --category2=' + config.category2[category2];
}

if(category3) {
  options += ' --category3=' + config.category3[category3];
}

// how many pages to traverse and collect data
shell.exec('casperjs ./src/casper_init.js' + options);
