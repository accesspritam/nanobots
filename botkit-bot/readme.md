# Botkit Starter Kit

## work-in-progress


This is a Botkit starter kit for web, created with the [Yeoman generator](https://github.com/howdyai/botkit/tree/master/packages/generator-botkit#readme).

To complete the configuration of this bot, make sure to update the included `.env` file with your platform tokens and credentials.

[Botkit Docs](https://botkit.ai/docs/v4)

This bot is powered by [a folder full of modules](https://botkit.ai/docs/v4/core.html#organize-your-bot-code). 
Edit the samples, and add your own in the [features/](features/) folder.



To run solution follow the instructions:

- ensure npm is installed 
- install botkit using ```npm install -g yo generator-botkit```.
- go to parent directory for the project which is  ```cd botkit-bot```.
- run ```npm start```
<br>this will start BOT server at http://localhost:3000 and get to chatting!

- along with this you will need api server which runs at http://localhost:3001
- both bot server and api server are mandatory to access entire solution.
- to start api server go to ```cd email-update```
- run ```npm start```
<br>this will start API server at http://localhost:3001
<br><br>Below are the api's supported.

## POST - /postmessage
- post api to store allocation/projection data 
## GET - /getalloc/:id 
- get api to retrieve allocation/projection data based on empid
## POST - /sendreminder
- post api to send reminder to user on email
## GET - /get/report
- get api to get the realtime allocation/projection data in html


