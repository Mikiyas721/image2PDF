const Telegraf = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('1111631380:AAFDD02uWSR6pXLwb8xoyGGpG5FeHYqhpyI');

const helpString = `*Image to PDF Bot*
This bot helps you *convert* your image files to PDF with only a few steps`;

bot.command('start', ctx => {
    ctx.telegram.sendMessage(ctx.chat.id, helpString, {
        parse_mode: "MarkdownV2"
    })
});


bot.launch();
