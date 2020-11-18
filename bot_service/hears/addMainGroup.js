const {addMainGroup} = require('../../constants').HEARS
module.exports = (bot)=>{
    bot.hears(addMainGroup,ctx => {
        console.log(ctx);
        ctx.reply("Hello World!")
    })
}
