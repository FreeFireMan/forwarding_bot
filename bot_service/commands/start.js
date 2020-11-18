const {firstMessage} = require('./../../constants').MESSAGES
module.exports = (bot) => {
    bot.start(ctx => {
        ctx.reply(firstMessage)
        console.log(ctx.from);
    })
}
