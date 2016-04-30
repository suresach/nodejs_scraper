//to install xml-parser module in windows type this in cmd:   npm install xml-parser
var fs = require('fs'); 
var parse = require('xml-parser');
var xml = fs.readFileSync('sample_table.html');
        var get_parser = parse(xml);
        var in_csv = [];
        get_parser.root.children.forEach(function(tr) {
            data.push(tr.children.map(function(td) {
                return td.content;
            }).join(','));
        });
        in_csv = in_csv.join('\r\n');
        fs.writeFile('dates.csv', in_csv, function(err){
            if(err){
                return console.error(err);
        }
