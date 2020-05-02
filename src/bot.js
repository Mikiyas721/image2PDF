const Telegraf = require('telegraf');
const axios = require('axios');
const api = require('convertapi')('XnxiVRXLqFjv9yRm');

const bot = new Telegraf('1111631380:AAFDD02uWSR6pXLwb8xoyGGpG5FeHYqhpyI');

const helpString = `*Image to PDF Bot*
This bot helps you *convert* your image files to PDF with only a few steps`;

bot.command('start', ctx => {
    ctx.telegram.sendMessage(ctx.chat.id, helpString, {
        parse_mode: "MarkdownV2"
    })
});

bot.on('photo', async ctx => {
    const userImageLink = await ctx.telegram.getFileLink(ctx.update.message.photo[(ctx.update.message.photo.length) - 1].file_id);
    const resultPromise = await api.convert('pdf', {File: userImageLink});
    ctx.replyWithDocument(resultPromise.response.Files[0].Url)
});


bot.launch();
