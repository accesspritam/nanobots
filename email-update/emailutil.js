/***
 * Send email template
 */
const nodemailer = require('nodemailer'); 
const to_id = '<enter your email>';
const from_id = '<enter your email>';
const from_pwd = '<enter your password>';
module.exports = function(){ 
    let mailTransporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user:from_id,
            pass: from_pwd
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
};