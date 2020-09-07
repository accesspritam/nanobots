/***
 * Send email template
 */
const nodemailer = require('nodemailer'); 
const to_id = '<enter you email>';
const from_id = '<enter you email>';
const from_pwd = '<enter you password>';

const fs = require('fs')
const config = require('./dataset.json')


module.exports = function(){ 
    /*let mailTransporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user:from_id,
            pass: from_pwd
        } 
    }); */
    var mailTransporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        auth: {
            user:from_id,
            pass: from_pwd
        },
        tls: {
            ciphers:'SSLv3'
        }
    });
    let mailDetails = { 
        from: from_id, 
        to: to_id, 
        subject: 'Reminder: Add Projections', 
        html: '<html><body><h2>Please fill Below Allocation Form</h2>'+
        '<table><tr><td>'+
        '<label for="fname">Employee Id:</label></td>'+
        '<td style="border: 1px black solid;width:200px"></td></tr>'+
        '<tr><td><label for="lname">Employee Name:</label></td>'+
        '<td style="border: 1px black solid;width:200px"></td></tr>'+
        '<tr><td><label for="lname">Project Code:</label></td>'+
        '<td style="border: 1px black solid;width:200px"></td></tr>'+
        '<tr><td><label for="lname">Allocation (dd/mm/yyyy):</label></td>'+
        '<td style="border: 1px black solid;width:200px"></td></tr></table>'+
        '</body></html>'
    }; 

    sendReminder = function (){
        mailTransporter.sendMail(mailDetails, function(err, data) { 
            if(err) { 
                console.log(err);
                console.log('Error Occurs'); 
            } else { 
                console.log('Email sent successfully'); 
            } 
        });
    }

    var startHtml='<!DOCTYPE html><head><title>report</title><head>'+

       ' <STYLE type="text/css">'+
        '.styled-table {border-collapse: collapse;margin-left:auto; margin-right:auto;font-size: 0.9em;font-family: sans-serif;min-width: 400px;box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);}'+
        '.styled-table thead tr {background-color: #009879;color: #ffffff;text-align: left;}'+
        '.styled-table th,.styled-table td {padding: 12px 15px;}'+
        '.styled-table tbody tr {border-bottom: 1px solid #dddddd;}'+
        '.styled-table tbody tr:nth-of-type(even) {background-color: #f3f3f3;}'+
        '.styled-table tbody tr:last-of-type {border-bottom: 2px solid #009879;}'+
        '.styled-table tbody tr.active-row {font-weight: bold;color: #009879;}'+
        '</STYLE></head><body>';

    var endHtml='</body></html>'
    var resultTableData='';
    sendReport = function (){

            fs.readFile('./dataset.json', 'utf8', (err, list) => {
                if (err) {
                    console.log("File read failed:", err)
                    return
                }
                console.log('File data:', list)

                var tableKey = JSON.parse(list);

                //console.log(tableKey.name1);

                Object.keys(tableKey).forEach(function(k){
                    //console.log('started for ------>'+k);
                    resultTableData += '<table class="styled-table"><th><td>'+k + '</td><td></td></th>';
                    traverse(tableKey[k],process);
                    resultTableData += '</table><br><br>'
                    //console.log(resultTableData);
                    //console.log('ended for ------>'+k);
                });

                var finalReportHtml = startHtml + resultTableData + endHtml;
                fs.writeFile('report.html', finalReportHtml, function (err) {
                  if (err) throw err;
                  console.log('report file written!');
                });


            })
            console.log('Successful');

        }

        //called with every property and its value
        function process(key,value) {
            if (typeof(value)=="object" && key.includes("quarter"))
            {
                resultTableData += '<tr><td rowspan="7" >' + key + '</td>' ; //<tr><td> ' +value +'</td><td>232</td></tr></tr>';
                //traverse(value,process);
                //resultTableData+= '</tr>'
            }
            else{
                if (key.includes("quarter"))
                    resultTableData += '<tr><td>' + key + '</td><td> ' +value +'</td></tr></tr>';
                else
                    resultTableData += '<tr><td>' + key + '</td><td> ' +value +'</td></tr>';
            }

        }

        function traverse(o,func) {
            for (var i in o) {
                func.apply(this,[i,o[i]]);
                if (o[i] !== null && typeof(o[i])=="object") {
                    //going one step down in the object tree!!
                    traverse(o[i],func);
                }
            }
        }




};