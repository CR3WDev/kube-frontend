
import { getCommand, getCommandFullDescription, getCommandListText, getBebidaListText, getPizzaListText} from './bot-commands';



export const controller = {
    async help(telegramId: string, name: string, sendMessage: (text: string) => Promise<void>) {
        return sendMessage(getCommandListText());
    },
    async start(telegramId: string, name: string, sendMessage: (text: string) => Promise<void>) {
        return sendMessage(`Bem vindo ao Pizza Planet!\nO que vai querer?\n${getBebidaListText()}`);
    },
    async combo(telegramId: string, name: string, sendMessage: (text: string) => Promise<void>) {
        return sendMessage(`Então vamos ecolher o seu combo! Para isso escreva no chat \n bebida <numero da bebida> \n pizza <numero da pizza>`),sendMessage(`Sabores de Pizza 🍕\n 1 - Pepperoni\n 2 - Calabresa\n`),sendMessage(`Qual a bebida 🥤\n 1 - Coca Cola\n 2 - Pepsi\n`);
    },
    async pizza(telegramId: string, name: string, quantity: number, sendMessage: (text: string) => Promise<void>) {
        if(quantity == 1){
            return sendMessage(`Uma Pizza de Calabresa saindo no capricho!\n`);
        }
        return sendMessage(`Uma Pizza de Pepperoni saindo no capricho!\n`);
    },
    async pizzas(telegramId: string, name: string, quantity: number, sendMessage: (text: string) => Promise<void>) {
        sendMessage(`Então vamos ecolher a sua pizza! Para isso escreva no chat \n  pizza <numero da pizza>`),sendMessage(`Sabores de Pizza 🍕\n 1 - Pepperoni\n 2 - Calabresa\n`);
    },
    async bebida(telegramId: string, name: string, quantity: number, sendMessage: (text: string) => Promise<void>) {
        if(quantity == 1){
            return sendMessage(`Uma Coquinha gelada saindo na hora!\n`);
        }
        return sendMessage(`Uma Pepsi gelada saindo na hora!\n`);
    },
   
}