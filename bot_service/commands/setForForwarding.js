const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
    bot.command('/set_up',ctx => {
        console.log(path.join(process.cwd()));
        ctx.reply('it is ok')
    })
}
