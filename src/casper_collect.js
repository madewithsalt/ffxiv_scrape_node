var _ = require('../node_modules/underscore'),
    $ = require('../node_modules/jquery'),
    casper = require('casper').create({
        logLevel: 'debug'
    }),
    traverse = require('./traverse');

// script arguments
var args = casper.cli.args,
    options = casper.cli.options;

var url = options.url,
    category = options.category,
    subCategory = options.subCategory,
    pages = options.pages || 1;

url += '?category2=' + category;

if(subCategory) {
    url += '&category3=' + subCategory;
}

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

var results = [],
    pagesRemaining = 1; //parseFloat(pages);

var links = [];
_.times(pagesRemaining, function(i) {
    links.push(url + '&page=' + (i + 1));
});

console.log(links);

casper.start().each(links, function(self, link) {
  self.thenOpen(link, function() {

    // kick off initial load and set pagination values
    this.waitForSelector('table#character tbody', function traverseContent() {
        var content = this.getElementInfo('table#character').html,
            $table = $('<div />').html(content);

        this.echo('<< trigger waitForSelector table#character >>', this.getCurrentUrl());
        results = _.union(results, traverse.parseTable($table));
    });
  });
});

casper.then(function() {
    this.echo('Writing to output');

    var fs = require('fs'),
        f  = require('utils').format,
        str = JSON.stringify({ "results": results }),
        targetFile = fs.absolute('./output/category2_' + category + '.json');

    try {
        fs.write(targetFile, str, 'w');
    } catch(err) {
        this.log(f("Failed to save page html to %s; please check permissions", targetFile), "error");
        this.log(err, "debug");
        return this;
    }

    // this.exit();
});

casper.run();
