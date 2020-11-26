require('dotenv').config();
// TELEGRAF BOT & TOKEN
const {bot} = require('./config/telegram/telegraf');

// bot_use
const {useSession} = require('./bot_service/use');
useSession(bot)

//commands
const {launch,start,setForForwarding} = require('./bot_service/commands');
start(bot);
setForForwarding(bot);

//on
const {documentHtml, contact} = require('./bot_service/on');
contact(bot)
documentHtml(bot);



//
// const {google:{client}} = require('./config');
// client.apiStart()
// // bot_launch
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
