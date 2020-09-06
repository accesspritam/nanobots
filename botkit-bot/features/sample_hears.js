/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
require('./data_provider.js')();
var stringSimilarity = require('string-similarity');

const request = require('request');

let url = "http://localhost:3001/";
let employeeAlloc = {};

let options = {json: true};
 module.exports = function(controller) {

    // use a regular expression to match the text of the message
    controller.hears(async (message) => message.text && message.text.toLowerCase() == 'yes', ['message','direct_message'], async function(bot, message) {
       setcurrent_field(null);
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
       let current_field = getcurrent_field();
       // get data from backend
       if(!current_field){
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
       }
       else{
           setcurrent_field('EName');
           employeeAlloc.employeeId = message.text.trim();
           await bot.reply(message, 'Employee Name?');
       }
  });

   // match any one of set of mixed patterns like a string, a regular expression
   controller.hears(new RegExp("[a-zA-Z0-9]","gi"), ['message','direct_message'], async function(bot, message) {
       let current_field = getcurrent_field();
       if(current_field){
           switch(current_field){
               case 'EName' :
                   employeeAlloc.employeeName = message.text.trim();
                   setcurrent_field('PCode');
                   return await bot.reply(message, 'Project Code?');
               case 'PCode':
                   employeeAlloc.projectCode = message.text.trim();
                   setcurrent_field('Alloc');
                   return await bot.reply(message, 'Allocation (dd/mm/yyyy)?');
               case 'Alloc':
                   employeeAlloc.allocation = message.text.trim();
                   setcurrent_field(null);
                   return await bot.reply(message, 'Please type yes to add');
               default:
                   setcurrent_field(null);
                   return await bot.reply(message, 'Sorry couldnot understand. Please enter your emp id or type add to continue');
           }
       }      
        else{
            //add learning capability for new keyword.
            let keys = [...getkeywords_group().keys()];
            var matches = stringSimilarity.findBestMatch(message.text.trim().toLowerCase(), keys);
            if(matches && matches.bestMatchIndex>=0 && matches.bestMatch && matches.bestMatch.rating>0){
                let group = getkeywords_group().get(keys[matches.bestMatchIndex]);
                await getgroup_function(group, bot, message);
            }
            else
                await bot.reply(message, 'Sorry couldnot understand. Please enter your emp id or type add to continue');                   
        }

   });

}