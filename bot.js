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
        description: 'A veces una pausa es necesaria...',
    },
    {
        name: 'almuerzo',
        description: 'Envía un mensaje con el horario de pausa para el almuerzo y un timestamp.',
    },
    {
        name: 'regreso',
        description: '¿Estás list@ para regresar a programar?'
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
    const timestamp = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });

    if (commandName === 'ping') {
        await interaction.reply('pong!');
    }

    if (commandName === 'entrada') {
        await interaction.reply(`${username} ha registrado el Horario de entrada 👋🏻: ${timestamp}`);
    }

    if (commandName === 'pausa') {
        await interaction.reply(`${username} cree que no hay nada mejor que tomarse un tiempo para descansar un poco 🪫: ${timestamp}`);
    }

    if (commandName === 'regreso'){
        await interaction.reply(`${username} ¡volvió con todas las pilas! 🔋💪🏻: ${timestamp}`);
    }

    if (commandName === 'almuerzo') {
        await interaction.reply(`${username} ha registrado el Horario de pausa para el almuerzo 🍽️ : ${timestamp}`);
    }

    if (commandName === 'salida') {
        await interaction.reply(`${username} ha registrado el Horario de salida 🚀: ${timestamp}`);
    }
});

client.login(TOKEN);
