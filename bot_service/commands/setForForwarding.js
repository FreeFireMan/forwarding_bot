const fs = require('fs');
const path = require('path');

module.exports = (bot) => {
    bot.command('/set_up',ctx => {
        console.log(ctx.chat);
        fs.writeFileSync(path.join(process.cwd(),'chat.txt'),ctx.chat.id)
        ctx.reply('it is '+ctx.chat.title);
    })
}
