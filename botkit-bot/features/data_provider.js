var current_field = null;
const keywords_group = new Map();
keywords_group.set('add',1);
keywords_group.set('add alloc',1);
keywords_group.set('add allocation',1);
keywords_group.set('send reminder',2);
const request = require('request');
let url = "http://localhost:3001/";
let options = {json: true};

module.exports = function(){ 
    getcurrent_field = function (){
        return current_field;
    } 
    setcurrent_field = function (val){
        current_field = val;
    } 
    getkeywords_group = function (){
        return keywords_group;
    } 
    setkeywords_group = function (key, val){
        keywords_group.put(key, val);
    }
    getgroup_function = async function(group,bot,message){
        switch(group){
            case 1:
                setcurrent_field('EmployeeId');
                // do something to respond to message
                await bot.reply(message,'Please provide details as below');
                await bot.reply(message,'EmployeeId?');
                break;
            case 2:
                setcurrent_field(null);
                // do something to respond to message
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
                break;
            default:
                setcurrent_field(null);
                await bot.reply(message, 'Sorry couldnot understand. Please enter your emp id or type add to continue'); 
                break;
        }
    }
};
