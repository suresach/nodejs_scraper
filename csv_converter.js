var parse = require('xml-parser');
var xml = fs.readFileSync('dara.html');
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
