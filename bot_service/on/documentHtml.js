const fs = require('fs');
const path = require('path');

const {userService} = require('./../../service')
const {
    MIMETYPE: mimeType
} = require('./../../constants')

module.exports = (bot) => {

    bot.on('document', async ctx => {

        const idChat = fs.readFileSync(path.join(process.cwd(), 'chat.txt'), "utf8")
        const {mime_type} = ctx.message.document
        const userObj = {...ctx.from, ...ctx.message.document}
        // console.log('mime_type');
        // console.log(mime_type);
        if(await userService.isRegUser(ctx.from.id)){
            if (mime_type === mimeType.TEXT_HTML
                || mime_type === mimeType.TEXT_CSS
                || mime_type === mimeType.APPLICATION_RAR
                || mime_type === mimeType.APPLICATION_ZIP
                || mime_type === mimeType.APPLICATION_RAR_VND
            ) {

                userService.logUserFileSending(userObj)
                ctx.forwardMessage(idChat, ctx.message.id).then(res => {
                    ctx.reply('file is forwarding')
                }).catch(err => {
                    console.log(err);
                    ctx.reply('file is NOT forwarding')
                })
            } else {
                console.log(ctx.message);
                ctx.reply('file is not accessing')
            }
        }else{
            ctx.reply('Ви повинні доти свій контакт, кнопка знизу')
        }

    });
}
