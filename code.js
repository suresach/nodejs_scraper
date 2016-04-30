var spawn = require('child_process').spawn;
var fs = require('fs');
var cron = require('node-schedule');
var parser = require('xml-parser');
var rule = new cron.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 7;
rule.minute = 00;
cron.scheduleJob(rule, function(){
    var command = "curl 'https://www.bsestarmf.in/RptNavMaster.aspx' -H 'Origin: https://www.bsestarmf.in' -H 'Accept-Encoding: gzip,                       deflate' -H 'Accept-Language: en-US,en;q=0.8' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64)                     AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/48.0.2564.116 Chrome/48.0.2564.116 Safari/537.36' -H 'Content-Type:      application/x-www-form-urlencoded' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: max-age=0' -H 'Referer: https://www.bsestarmf.in/RptNavMaster.aspx' -H 'Connection: keep-alive' --data '__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUKLTg4OTQxNzY2NQ9kFgICAw9kFgQCAQ8PFgIeDFNlbGVjdGVkRGF0ZQYAhP3wyW7TiGRkAgkPPCsADQBkGAIFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBQl0eHRUb0RhdGUFCUdyaWRWaWV3MQ9nZMUzDP2jIJpGEM%2BFaz4cbuYfGNDl&__EVENTVALIDATION=%2FwEWBALkjOWoBAKit8CHDgLCi9reAwK14buQBdUkrDVoZqED%2BaFsaiv%2BnNZsSR7D&txtToDate%24TextBox=28-Apr-2016&btnSubmit=FETCH' --compressed";
    
    var month = new Array(12);
    month[0]=  "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var dates = date.getDate() + '-' + month[date.getMonth()] + '-' + date.getFullYear();
    updated_command = command.replace('28-Apr-2016', dates);
    var final_command = spawn(updated_command);
    final_command.stdout.on('data', function(data) { 
        fs.writeFile(dates+'.html', data, function(err){
            if(err){
                return console.error(err);
            }
        });
    });

    final_command.stderr.on('data', function(data) { 
        console.log('stderr: '+data);
    });

    final_command.on('exit', function(code) { 
        var xml = fs.readFileSync(dates+'.html');
        var get_parser = parser(xml);
        var in_csv = [];
        get_parser.root.children.forEach(function(tr) {
            data.push(tr.children.map(function(td) {
                return td.content;
            }).join(','));
        });
        in_csv = in_csv.join('\r\n');
        fs.writeFile(dates+'.csv', in_csv, function(err){
            if(err){
                return console.error(err);
            }
        });
    });

});
