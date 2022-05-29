import { Telegraf } from "telegraf";
import { TG_BOT_TOKEN } from "./config.mjs";
import { addItem } from "./services.js";

const optionsToSelect = {
  1: "Add-item",
};

let actualItem = 0;

const bot = new Telegraf(TG_BOT_TOKEN);

bot.command("start", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "Qloq, enviame algo para guardar");
});

bot.command("additem", (ctx) => {
  actualItem = 1;
  bot.telegram.sendMessage(ctx.chat.id, "Enviame algo para guardar");
});

bot.on("message", async (ctx) => {
  if (actualItem === 1) {
    bot.telegram.sendMessage(ctx.chat.id, "Gurdando...");

    // call Petition

    try {
      await addItem({
        title: ctx.message.text,
      });
      bot.telegram.sendMessage(ctx.chat.id, "Item agregado con exito");
    } catch (error) {
      console.log(error.response);
      bot.telegram.sendMessage(ctx.chat.id, "Ocurrio un error al guardar :'v");
    }

    actualItem = 0;

    return;
  }

  bot.telegram.sendMessage(ctx.chat.id, ":v ?");
});

bot.command("/end", (ctx) => {
  actualItem = 0;
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Si te da la gana selecciona otra opción"
  );
});

bot.launch();

console.log("bot is running");
