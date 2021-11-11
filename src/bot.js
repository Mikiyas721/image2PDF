const Telegraf = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const api = require('convertapi')(process.env.API_TOKEN);


let fileUrl = '';

const helpString = `*Image to PDF Bot*
This bot helps you *convert* your image files to PDF with only a few steps`;

const toFile = `*Choose the file format you want to change to:* 
/jpg
/pdf
/png
`;

bot.on('photo', async ctx => {
    fileUrl = await ctx.telegram.getFileLink(ctx.update.message.photo[(ctx.update.message.photo.length) - 1].file_id);
    console.log(ctx);
    ctx.telegram.sendMessage(ctx.chat.id, toFile, {parse_mode: "Markdown"});

});

bot.command('start', ctx => {
    ctx.telegram.sendMessage(ctx.chat.id, helpString, {
        parse_mode: "Markdown"
    })
});

bot.command("jpg", async ctx => {
    const resultPromise = await api.convert('jpg', {File: fileUrl});
    ctx.replyWithPhoto(resultPromise.response.Files[0].Url)
});

bot.command("pdf", async ctx => {
    const resultPromise = await api.convert('pdf', {File: fileUrl});
    ctx.replyWithDocument(resultPromise.response.Files[0].Url)
});

bot.command("png", async ctx => {
    const resultPromise = await api.convert('png', {File: fileUrl});
    ctx.replyWithPhoto(resultPromise.response.Files[0].Url)
});


bot.launch();
