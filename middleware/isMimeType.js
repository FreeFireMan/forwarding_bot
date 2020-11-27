// Мідлварка для перевірки чи mimeType document for forwarding
const {
    MIMETYPE: mimeType
} = require('./../constants')

module.exports = async (ctx, next) => {
    try {
        const {mime_type} = ctx.message.document

        if (mime_type === mimeType.TEXT_HTML
            || mime_type === mimeType.TEXT_CSS
            || mime_type === mimeType.APPLICATION_RAR
            || mime_type === mimeType.APPLICATION_ZIP
            || mime_type === mimeType.APPLICATION_RAR_VND
        ) {
            next();
        }else {
            console.log(mime_type);
            ctx.reply('file is not accessing of this type:'+mime_type)
        }
    } catch (e) {
        console.log(`My error in Middleware_isMimeType\n${e.message}`);
    }
};