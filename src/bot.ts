import { Client, Guild, Routes, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
import { REST } from "@discordjs/rest";
import { DISCORD_BOT_API_TOKEN } from './auth-constants';
import { ALL_COMMANDS } from './commands/index';

console.log("Bot is starting...");

const client = new Client({
    intents: []
});

async function registerCommand(client: Client, guild: Guild, commands: RESTPostAPIApplicationCommandsJSONBody[]) {
    console.log("Start command registration");
    const rest = new REST({ version: "9" }).setToken(DISCORD_BOT_API_TOKEN);
    const userID = client.user?.id || "No ID"
    await rest.put(Routes.applicationGuildCommands(userID, guild.id), { body: [] })
        .then(() => console.log('Successfully cleared commands'))
        .catch(console.error)
        .finally(() => {
            rest.put(
                Routes.applicationGuildCommands(userID, guild.id), { body: commands })
                .then(() => console.log('Successfully deployed commands'))
                .catch(console.error)
        });
}

client.once('ready', () => {
    console.log("Ready");
    const delayedRegistration = setInterval(() => {
        clearInterval(delayedRegistration);
        let commands = ALL_COMMANDS.map(cmd => cmd.data.toJSON());
        client.guilds.cache.forEach(guild => {
            registerCommand(client, guild, commands);
        })
    }, 1000);
});

// Load all slash commands
let commands = new Map<String, any>();
for (const command of ALL_COMMANDS) {
    commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(DISCORD_BOT_API_TOKEN);

