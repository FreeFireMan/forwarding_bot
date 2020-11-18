

// const {userService, fsService} = require('./../service');
const {

    DESTENATION: localPath,
    MIMETYPE: mimeType } = require('./../../constants')

module.exports = (bot) => {
    bot.on('document', ctx => {
        console.log(ctx.message);
        const {file_id, file_name, mime_type} = ctx.message.document
        // if(mime_type.split('/').shift() === mimeType.IMAGE) {
        if(mime_type === mimeType.TEXT_HTML) {
            console.log('mimeType.TEXT_HTML',mimeType.TEXT_HTML);
            // ctx.telegram.getFileLink(file_id).then(url => {
                        //     fsService.downloadedByUrlAndName(url, localPath.PHOTO,file_name)
                        //         .then(result => {
                        //             ctx.reply("thank you for image "+result)
                        //         })
                        // })


        }
    });
}
