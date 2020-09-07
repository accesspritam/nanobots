/***
 * Send email template
 */
const nodemailer = require('nodemailer'); 
const to_id = '';
const from_id = '';
const from_pwd = '';
module.exports = function(){ 
    let mailTransporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user:from_id,
            pass: from_pwd
        } 
    }); 
    /*var mailTransporter = nodemailer.createTransport({
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
    });*/
    let mailDetails = { 
        from: from_id, 
        to: to_id, 
        subject: 'Reminder: Add Projections', 
        html: '<html><body><h2>Please fill Below Projection Form</h2><p style="display:none;">emp#12342</p>'+
        '<table><tr><td style="border: 1px black solid;width:200px;background-color:#f0aa78;">'+
        '<label for="fname">Project Code :</label></td>'+
        '<td colspan="3" style="border: 1px black solid;width:200px;background-color:#81c2f0;">PROJECTCODE1</td></tr>'+
        '<tr><td style="border: 1px black solid;width:200px;background-color:#f0aa78;">'+
        '<label for="fname">Service Line :</label></td>'+
        '<td colspan="3" style="border: 1px black solid;width:200px;background-color:#81c2f0;">SAP</td></tr>'+
        '<tr><td style="border: 1px black solid;width:200px;background-color:#f0aa78;">'+
        'Estimated</td>'+
        '<td style="border: 1px black solid;width:200px;background-color:#b8daf2;">Jul</td>'+
        '<td style="border: 1px black solid;width:200px;background-color:#b8daf2;">Aug</td>'+
        '<td style="border: 1px black solid;width:200px;background-color:#b8daf2;">Sep</td>'+
        '</tr>'+
        '<tr><td style="border: 1px black solid;width:200px;background-color:#f0aa78;">'+
        '<label for="lname">Offshore Addition</label></td>'+
        '<td style="border: 1px black solid;width:200px;background-color:#b8daf2;"></td>'+
        '<td style="border: 1px black solid;width:200px;background-color:#b8daf2;"></td>'+
        '<td style="border: 1px black solid;width:200px;background-color:#b8daf2;"></td>'+
        '</tr>'+
        '<tr><td style="border: 1px black solid;width:200px;background-color:#f0aa78;">'+
        '<label for="lname">Onsite Reduction</label></td>'+
        '<td style="border: 1px black solid;width:200px;background-color:#b8daf2;"></td>'+
        '<td style="border: 1px black solid;width:200px;background-color:#b8daf2;"></td>'+
        '<td style="border: 1px black solid;width:200px;background-color:#b8daf2;"></td>'+
        '</tr></table>'+
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
};
