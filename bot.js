const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log('Bot listo!');
});

const commands = [
    {
        name: 'ping',
        description: 'Responde con pong!',
    },
    {
        name: 'entrada',
        description: 'Envía un mensaje con el horario de entrada y un timestamp.',
    },
    {
        name: 'pausa',
        description: 'Envía un mensaje con el horario de pausa para el almuerzo y un timestamp.',
    },
    {
        name: 'salida',
        description: 'Envía un mensaje con el horario de salida y un timestamp.',
    },
];

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Empezando a registrar los slash commands.');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log('Los slash commands se registraron con éxito.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, user } = interaction;
    const username = user.username;
    const timestamp = new Date().toLocaleString();

    if (commandName === 'ping') {
        await interaction.reply('pong!');
    }

    if (commandName === 'entrada') {
        await interaction.reply(`${username} ha registrado el Horario de entrada 👋🏻: ${timestamp}`);
    }

    if (commandName === 'pausa') {
        await interaction.reply(`${username} ha registrado el Horario de pausa para el almuerzo 🍽️ : ${timestamp}`);
    }

    if (commandName === 'salida') {
        await interaction.reply(`${username} ha registrado el Horario de salida 🚀: ${timestamp}`);
    }
});

client.login(TOKEN);
