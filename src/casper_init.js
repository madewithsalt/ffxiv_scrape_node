var _ = require('../node_modules/underscore'),
    $ = require('../node_modules/jquery'),
    casper = require('casper').create(),
    traverse = require('./traverse');

// script arguments
var args = casper.cli.args,
    options = casper.cli.options;

var url = options.url,
    category = options.category,
    subCategory = options.subCategory,
    pages = options.pages;

url += '?category2=' + category;

if(subCategory) {
    url += '&category3=' + subCategory;
}

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

var results = [],
    links = [];

casper.start();

if(!pages) { 
    casper.thenOpen(url, function() {

        this.waitForSelector('table#character tbody', function traverseContent() {
            var self = this,
                $pagination = $(this.getElementInfo('.pagination').html),
                itemTotal = $pagination.find('.total').text(),
                countStart = $pagination.find('.show_start').text(),
                countEnd = $pagination.find('.show_end').text(),
                itemsPerPage = parseFloat(countEnd) - parseFloat(countStart) + 1;


            var totalPages = Math.ceil(itemTotal / itemsPerPage);
            pages = totalPages;
        });
    });
}

casper.then(function() {
    this.echo('Compiling links for ' + pages + ' pages');

    if(pages > 1) {
        _.times(pages, function(i) {
            links.push(url + '&page=' + (i + 1));
        });        
    } else {
        links.push(url + '&page=1');
    }

    this.each(links, function(self, link) {
        self.waitFor(function check() {
            self.echo('zzz...');
            return setTimeout(function() { return true; }, 2000);
        });

        self.thenOpen(link, function() {
            this.waitForSelector('table#character tbody', function traverseContent() {
                this.echo('Updating results from ' + this.getCurrentUrl());

                var self = this,
                    content = this.getElementInfo('table#character').html,
                    $table = $('<div />').html(content),
                    tableData = traverse.parseTable($table);

                results = _.union(results, tableData);
            });
        });

    });
});

casper.then(function() {
    this.echo('Writing to ./output/category2_' + category + '.json');

    var fs = require('fs'),
        f  = require('utils').format,
        str = JSON.stringify({ "results": results }),
        targetFile = fs.absolute('./output/category2_' + category + '.json');

    try {
        fs.write(targetFile, str, 'w');
        this.echo('Done!');

    } catch(err) {
        this.log(f("Failed to save page html to %s; please check permissions", targetFile), "error");
        this.log(err, "debug");
        return this;
    }

    this.exit();
});

casper.run();
