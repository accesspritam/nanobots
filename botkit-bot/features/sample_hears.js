/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const request = require('request');

let url = "http://localhost:3001/";
let employeeAlloc = {};

let options = {json: true};
 module.exports = function(controller) {

   // use a function to match a condition in the message
   controller.hears(async (message) => message.text && message.text.indexOf('EMP#')>=0, ['message','direct_message'], async (bot, message) => {
       employeeAlloc.employeeId = message.text.replace('EMP#','').trim();
       await bot.reply(message, 'Employee Name?');
   });
   // use a function to match a condition in the message
   controller.hears(async (message) => message.text && message.text.indexOf('EName#')>=0, ['message','direct_message'], async (bot, message) => {
       employeeAlloc.employeeName = message.text.replace('EName#','').trim();
       await bot.reply(message, 'Project Code?');
   });
   // use a function to match a condition in the message
   controller.hears(async (message) => message.text && message.text.indexOf('PCode#')>=0, ['message','direct_message'], async (bot, message) => {
       employeeAlloc.projectCode = message.text.replace('PCode#','').trim();
       await bot.reply(message, 'Allocation (dd/mm/yyyy)?');
   });

   controller.hears(async (message) => message.text && message.text.indexOf('Alloc#')>=0, ['message','direct_message'], async (bot, message) => {
       employeeAlloc.allocation = message.text.replace('Alloc#','').trim();
       await bot.reply(message, 'Please type yes to add');
   });

    // use a regular expression to match the text of the message
    controller.hears(async (message) => message.text && message.text.toLowerCase() == 'yes', ['message','direct_message'], async function(bot, message) {
       // get data from backend
        await new Promise(resolve => {
           request.post({
               url: url+'postmessage', 
               json: employeeAlloc,
               headers: {'content-type' : 'application/json'}
           }
           , async(error, res, body) => {
           if (error) {
               console.error(error);
               await bot.reply(message, 'Projection could not be added. Please try again');
               resolve();
               return;
           }
           console.log(`statusCode: ${res.statusCode}`);
           await bot.reply(message, 'Projection added successfully for Employee: '+employeeAlloc.employeeId);
           resolve();           
           });
      });
  });

   // use a function to match a condition in the message
   controller.hears(async (message) => message.text && message.text.toLowerCase() === 'foo', ['message'], async (bot, message) => {
       await bot.reply(message, 'I heard "foo" via a function test');
   });

   // use a regular expression to match the text of the message
   controller.hears(new RegExp("\\bSend Reminder\\b","gi"), ['message','direct_message'], async function(bot, message) {
        // get data from backend
         await new Promise(resolve => {
           request(url+"sendreminder", options, async (error, res, body) => {
               if (error) {
                   console.log(error);
                   message.text = "Cound not send Reminder. Please try again";
                   await bot.reply(message, `${ message.text }`);
                   resolve();
               }       
               if (!error && res.statusCode == 200) {
                   // do something with JSON, using the 'body' variable
                   if(res.body && res.body.status){
                       console.log(res.body);
                       message.text = "Reminder Sent. Please fill details and reply in email to add projetion";
                   }
                   else{
                       message.text = "Cound not send Reminder. Please try again";
                   }
                   await bot.reply(message, `${ message.text }`);
                   resolve();
               }
           });
       });
   });

   // use a regular expression to match the text of the message
   controller.hears(new RegExp(/^\d+$/), ['message','direct_message'], async function(bot, message) {
       // get data from backend
       await new Promise(resolve => {
           request(url+"getalloc/"+message.text, options, async (error, res, body) => {
               if (error) {
                   console.log(error);
                   message.text = "Emp id "+message.text +" was not Found, please re-enter";
                   await bot.reply(message, `${ message.text }`);
                   resolve();
               };
           
               if (!error && res.statusCode == 200) {
                   // do something with JSON, using the 'body' variable
                   if(res.body && res.body.employeeId){
                       console.log(res.body);
                       let body = res.body;
                       message.text = "Emp id "+message.text +" was found...Retrieving details \n "+ "Emp Id: "+body.employeeId
                       +"  Emp Name: "+body.employeeName+"  Project Code: "+body.projectCode+ "  Allocation: "+body.allocation;
                   }
                   else{
                       message.text = "Emp id "+message.text +" was not Found, please re-enter";
                   }
                   await bot.reply(message, `${ message.text }`);
                   resolve();
               };
           });
       });
   });

   // match any one of set of mixed patterns like a string, a regular expression
   controller.hears(['allcaps', new RegExp(/^[A-Z\s]+$/)], ['message','direct_message'], async function(bot, message) {
       await bot.reply(message,{ text: 'I HEARD ALL CAPS!' });
   });

}
