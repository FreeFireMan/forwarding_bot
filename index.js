require('dotenv').config();
// TELEGRAF BOT & TOKEN
const {bot} = require('./config/telegram/telegraf');

//commands
const {launch,start,setForForwarding} = require('./bot_service/commands');
start(bot);
setForForwarding(bot);

//on
const {documentHtml} = require('./bot_service/on');
documentHtml(bot);

// bot_use
const {useSession} = require('./bot_service/use');
useSession(bot)


// const {google:{client}} = require('./config');
// client.googleSheetAddUser('name:Vasya')
// bot_launch
try {
    launch(bot);
}catch (e) {
    console.log(e);
}

// exports.handler = (event,context,callback) => {
//
//
//     bot.handleUpdate(event);
//     return callback(null, {
//         status: 200,
//         body:"",
//     })
// };
