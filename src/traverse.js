var $ = require('../node_modules/jquery'),
    _ = require('underscore');

module.exports = {
    parseTable: function($table, options) {
        options = options || {};

        var self = this,
            output = [];

        $table.find('tbody tr').each(function() {
            output.push(self.parseTableRow($(this)));
        });

        return output;
    },

    parseTableRow: function($row) {
        var $el = $row,
            $link = $el.find('.ic_link_txt'),
            name = $link.children('a').last().text(),
            category = $link.children('span').first().text(),
            $img = $el.find('img[src*="itemicon"]'),
            icon_url = $img.attr('src'),
            item_url = $img.next('a').attr('href');
        
        var bits = item_url.split('/'),
            id = bits[bits.length - 2];

        return {
            name: name.trim(),
            sub_category: category.trim(),
            id: id,
            icon_url: icon_url
        };
    },

    parseItemDetail: function($detail) {
         var $el = $row,
            $link = $el.find('.ic_link_txt'),
            name = $link.children('a').last().text(),
            category = $link.children('span').first().text(),
            $img = $el.find('img[src*="itemicon"]'),
            icon_url = $img.attr('src'),
            item_url = $img.next('a').attr('href'),
            descr = '';
        
        var bits = item_url.split('/'),
            id = bits[bits.length - 2];
   
        return {
            name: name.trim(),
            sub_category: category.trim(),
            id: id,
            icon_url: icon_url,
            description: descr
        };        
    }
};