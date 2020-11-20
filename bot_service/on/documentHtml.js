const fs = require('fs');
const path = require('path');
const {
    MIMETYPE: mimeType
} = require('./../../constants')
module.exports = (bot) => {

    bot.on('document', ctx => {
        const idChat = fs.readFileSync(path.join(process.cwd(),'chat.txt'), "utf8")
        const {mime_type} = ctx.message.document
        console.log('mime_type');
        console.log(mime_type);
        if(mime_type === mimeType.TEXT_HTML
            || mime_type === mimeType.TEXT_CSS
            || mime_type === mimeType.APPLICATION_RAR
            || mime_type === mimeType.APPLICATION_ZIP
        ) {
            ctx.forwardMessage(idChat,ctx.message.id)
        }
    });
}
