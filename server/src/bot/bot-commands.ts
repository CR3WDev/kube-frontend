type BotCommand = {
    command: string
    args?: string
    description: string
}

const commands = [
    {
        command: 'combo',
        description: 'Para escolher uma pizza e uma bebida'
    },
    {
        command: 'pizzas',
        description: 'Para escolher apenas a pizza'
    }
]
const pizza = [
    {
        command: 'Pizza1',
        args: 'Calabresa',
        description: 'Para escolher uma pizza e uma bebida'
    },
    {
        command: 'Pizza2',
        args: 'Peperone',
        description: 'Para escolher apenas a pizza'
    }
]
const bebida = [
    {
        command: 'Bebida1',
        args: 'Coca Cola',
    },
    {
        command: 'Bebida2',
        args: 'Pepsi',
    }
]

const getCommand = (commandName: string) => {
    const command = commands.find(x => x.command == commandName);
    if (!command)
        throw new Error('Invalid command' + commandName)

    return command;
}
const getCardapioPizza = (comidaNome: string) => {
    const command = pizza.find(y => y.command == comidaNome);
    if (!command)
        throw new Error('Invalid command' + comidaNome)

    return command;
}
const getCardapioBebida = (commandName: string) => {
    const command = bebida.find(z => z.command == commandName);
    if (!command)
        throw new Error('Invalid command' + commandName)

    return command;
}

const getCommandFullDescription = (x: BotCommand) =>
    `${x.command}${x.args ? ' ' + x.args : ''} - ${x.description}`;

const getCardapioPizzaDescricao = (y: BotCommand) =>
    `${y.command}${y.args ? ' ' + y.args : ''} - ${y.description}`;

const getCardapioBebidaDescricao = (z: BotCommand) =>
    `${z.command}${z.args ? ' ' + z.args : ''} - ${z.description}`;

const getPizzaListText = () =>
    commands.map(getCardapioPizzaDescricao)
        .join('\n');

const getBebidaListText = () =>
    commands.map(getCardapioBebidaDescricao)
        .join('\n');

const getCommandListText = () =>
    commands.map(getCommandFullDescription)
        .join('\n');

export {
    getCommand,
    getCardapioPizza,
    getCardapioPizzaDescricao,
    getPizzaListText,
    getCardapioBebida,
    getCardapioBebidaDescricao,
    getBebidaListText,
    getCommandFullDescription,
    getCommandListText,
    BotCommand
}