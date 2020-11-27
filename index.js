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

// bot_launch
try {
    launch(bot);
}catch (e) {
    console.log(e);
}

//this part for lamda on aws

// exports.handler = (event,context,callback) => {
//
//
//     bot.handleUpdate(event);
//     return callback(null, {
//         status: 200,
//         body:"",
//     })
// };
