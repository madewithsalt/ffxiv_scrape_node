var $ = require('../node_modules/jquery'),
    casper = require('casper').create();

// script arguments
var args = casper.cli.args,
    options = casper.cli.options;

var url = options.url,
    category = options.category;

casper.start();
 
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');
 
casper.thenOpen(url + '?category2=' + category);

// parse eorzea_db contents
casper.waitForSelector('table#character tbody', function() {
    var content = this.getElementInfo('table#character').html,
        $table = $('<div />').html(content),
        output = [];

    $table.find('tbody tr').each(function() {
        var $el = $(this),
            $link = $el.find('.ic_link_txt'),
            name = $link.children('a').last().text(),
            category = $link.children('span').first().text(),
            icon_url = $el.find('img[src*="itemicon"]').attr('src');


        var href = $link.children('a').last().attr('href'),
            bits = href.split('/'),
            id = bits[bits.length - 1].replace('/', '');

        output.push({
            name: name,
            sub_category: category,
            id: id,
            icon_url: icon_url
        });
    });
});

casper.run();