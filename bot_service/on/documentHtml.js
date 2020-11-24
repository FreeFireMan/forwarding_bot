const fs = require('fs');
const path = require('path');
const {google:{client}} = require('./../../config');

const {
    MIMETYPE: mimeType
} = require('./../../constants')
module.exports = (bot) => {

    bot.on('document', ctx => {
        console.log(ctx.from);
        const idChat = fs.readFileSync(path.join(process.cwd(),'chat.txt'), "utf8")
        const {mime_type} = ctx.message.document
        const userObj = {...ctx.from,...ctx.message.document}
        console.log('mime_type');
        console.log(mime_type);
        if(mime_type === mimeType.TEXT_HTML
            || mime_type === mimeType.TEXT_CSS
            || mime_type === mimeType.APPLICATION_RAR
            || mime_type === mimeType.APPLICATION_ZIP
        ) {
            client.googleSheetAddUser(userObj)
            ctx.forwardMessage(idChat,ctx.message.id).then(res=>{
                console.log('forwardMessage');
                console.log(res);
                ctx.reply('file is forwarding')
            }).catch(err=>{
                err.log('error')
                ctx.reply('file is NOT forwarding')
            })
        }

    });
}
