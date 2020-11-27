// Мідлварка для перевірки отримання повідомлень (команд) в особисті повідомлення боту

module.exports = async (ctx, next) => {
    try {
        if (ctx.update.message.chat.type === 'private') {
            console.log('i here');
            next();
        } else {
            await ctx.reply('Це не приватний чат із ботом 🙂\nНапишіть боту в особисті повідомлення, дякуємо!');
            throw new Error('error in ISCHATTYPEPRIVATE MIDDLEWARE');
        }
    } catch (e) {
        console.log(`My error in Middleware_isChatTypePrivate\n${e.message}`);
    }
};
