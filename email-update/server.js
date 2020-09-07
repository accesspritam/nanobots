var Imap = require("imap");
var MailParser = require("mailparser").MailParser;
var Promise = require("bluebird");
Promise.longStackTraces();
require('./expressapp.js')();
const request = require('request');

var schedule = require('node-schedule');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//const from_id = 'rohit.singh3688infy@OUTLOOK.com';
const from_id = '';
const from_pwd = '';
const apiURL = 'http://localhost:3001/';
/***
 * Read email template
 */
var imapConfig = {
    user: from_id,
    password: from_pwd,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false
    },
    keepalive: true
};

var imap = null;

var j = schedule.scheduleJob('*/1 * * * *', function(){
    console.log('Poll mail box every 1 min');
    imap && (imap = null);
    imap = new Imap(imapConfig);
    Promise.promisifyAll(imap);

    imap.once("ready", execute);
    imap.once("error", function(err) {
        //console.log("Connection error: " + err.stack);
    });
    imap.once('end', function() {
        console.log('Connection ended');
    });
    imap.connect();
});

function execute() {
    imap.openBox("INBOX", false, function(err, mailBox) {
        if (err) {
            console.error(err);
            return;
        }
        imap.search(['UNSEEN', ['SUBJECT', 'Re: Reminder: Add Projections']], function(err, results) {
            if(!results || !results.length){console.log("No unread mails");imap.end();return;}
            

            var f = imap.fetch(results, { bodies: "" });
            f.on("message", processMessage);
            f.once("error", function(err) {
                console.log('Fetch error: ' + err);
            });
            f.once("end", function() {
                console.log("Done fetching all unseen messages.");
                imap.end();
            });
        });
    });
}


function processMessage(msg, seqno) {
    
    var parser = new MailParser();

    parser.on('data', data => {
        if (data.type === 'text') {
            console.log("Processing msg #" + seqno);
            let mailResponse = data.textAsHtml;
            console.log(mailResponse);
            let offshorecount = mailResponse.split('Offshore Addition')[1].split('<')[0].replace(/^\s+|\s+$/g, '' ).split(' ');
            let onsitecount = mailResponse.split('Onsite Reduction')[1].split('<')[0].replace(/^\s+|\s+$/g, '' ).split(' ');
            let employeeId = mailResponse.split('emp#')[1].split('<')[0].replace(/^\s+|\s+$/g, '' );
            let projectcode = mailResponse.split('Project Code :')[1].split('<')[0].replace(/^\s+|\s+$/g, '' );
            let serviceline = mailResponse.split('Service Line :')[1].split('<')[0].replace(/^\s+|\s+$/g, '' );
            let projectProjection = {
                'employeeId' : employeeId,
                'projectCode': projectcode,
                'serviceLine': serviceline,
                'projections': []
            };
            projectProjection.projections.push({
                'offshoreAddition': offshorecount[0],
                'onshoreReduction': onsitecount[0],
                'month': 'jul',
                'year': '2021'
            });
            projectProjection.projections.push({
                'offshoreAddition': offshorecount[1],
                'onshoreReduction': onsitecount[1],
                'month': 'aug',
                'year': '2021'
            });
            projectProjection.projections.push({
                'offshoreAddition': offshorecount[2],
                'onshoreReduction': onsitecount[2],
                'month': 'sep',
                'year': '2021'
            });
            console.log(projectProjection);
            request.post({
                url: apiURL+'postprojection', 
                json: projectProjection,
                headers: {'content-type' : 'application/json'}
            }
            , (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`);
            });
        }

     });

    msg.on("body", function(stream) {
        stream.on("data", function(chunk) {
            parser.write(chunk.toString("utf8"));
        });
        stream.once('end', function () {
            // Mark the above mails as read
            msg.once('attributes', function (attrs) {
                let uid = attrs.uid;
                imap.addFlags(uid, ['\\Seen'], function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Marked as read!")
                    }
                });

            });
        });
    });
    msg.once("end", function() {
        console.log("Finished msg #" + seqno);
        parser.end();
    });
}




