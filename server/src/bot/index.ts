import TelegramBot from "node-telegram-bot-api";
import * as messageServices from "../services/message.services";
import "dotenv/config";
import { controller } from "./controller";


const token = process.env.BOT_TOKEN;
if (!token) throw new Error("Missing BOT_TOKEN");
  const bot = new TelegramBot(token, { polling: true });

const msgData = (msg: TelegramBot.Message) => {
  const [chatId, telegramId, text, name] = [msg.chat.id, msg.from?.id.toString(), msg.text, `${msg.from?.first_name} ${msg.from?.last_name}`];
  return {
      telegramId,
      text,
      name,
      async sendMessage(msgText: string): Promise<void> {
          await bot.sendMessage(chatId, msgText);
      }
  }
}

bot.on("message", async (msg: TelegramBot.Message) => {
  let message = {
    roomId: msg.chat.id.toString(),
    sender: `${msg.chat.first_name} ${msg.chat.last_name}`,
    text: msg.text || "",
    type: "outgoing",
    time: new Date(),
  };
  await messageServices.saveMessage(message);
});
export const sendMessage = (roomId: string, message: string) => {
  bot.sendMessage(roomId, message);
};

bot.onText(/\/start/, async (msg, match) => {
  const { telegramId, name, sendMessage } = msgData(msg);
  if (telegramId) {
      await controller.start(telegramId, name, sendMessage);
  }
});

bot.onText(/combo/, async (msg, match) => {
  const { telegramId, name, sendMessage } = msgData(msg);
  if (match && telegramId) {
      const quantity = parseFloat(match[1]);
      await controller.combo(telegramId, name, sendMessage);
  }
});
bot.onText(/pizza(.*)/, async (msg, match) => {
  const { telegramId, name, sendMessage } = msgData(msg);
  if (match && telegramId) {
      const quantity = parseFloat(match[1]);
      await controller.pizza(telegramId, name, quantity, sendMessage);
  }
});
bot.onText(/pizzas/, async (msg, match) => {
  const { telegramId, name, sendMessage } = msgData(msg);
  if (match && telegramId) {
      const quantity = parseFloat(match[1]);
      await controller.pizzas(telegramId, name, quantity, sendMessage);
  }
});
bot.onText(/bebida(.*)/, async (msg, match) => {
  const { telegramId, name, sendMessage } = msgData(msg);
  if (match && telegramId) {
      const quantity = parseFloat(match[1]);
      await controller.bebida(telegramId, name, quantity, sendMessage);
  }
});
