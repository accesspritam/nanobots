/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

require('./data_provider.js')();

module.exports = function(controller) {

    controller.hears('sample','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'I heard a sample message.');
    });

    // wait for a new user to join a channel, then say hi
    controller.on('channel_join', async(bot, message) => {
        await bot.reply(message,'Welcome to the channel!');
    });

    controller.hears([new RegExp("\\bhi\\b","gi"),'hello','howdy','hey','aloha','hola','bonjour',new RegExp("\\boi\\b","gi")],['message'], async (bot,message) => {
      setcurrent_field(null);
      // do something to respond to message
      await bot.reply(message,'Oh Hi! , Please enter your emp id or type add to continue');

    });

    controller.hears(['add','add alloc','add allocation'],['message'], async (bot,message) => {
        setcurrent_field('EmployeeId');
        // do something to respond to message
        await bot.reply(message,'Please provide details as below');
        await bot.reply(message,'EmployeeId?');
    });

    controller.hears(['bye','bbyee',new RegExp("\\bby\\b","gi"),'thanks'],['message'], async (bot,message) => {
        setcurrent_field(null);
        // do something to respond to message
        await bot.reply(message,'Have a nice day. Hope to see you soon.');
  
      });

}
