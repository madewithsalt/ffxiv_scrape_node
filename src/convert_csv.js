var fs = require('fs'),
    path = require('path'),
    converter = require('json-2-csv');

var data = require(path.resolve(__dirname, '../output/category2_6.json'));

return converter.json2csv(data.results, function onSuccess(err, csv) {
    if(err) {
        return console.log('something farted');
    }

    fs.writeFileSync(path.resolve(__dirname, '../output/category2_6.csv'), csv);
});