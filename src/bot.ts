import { Client, Guild, Routes, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
import { REST } from "@discordjs/rest";
import { DISCORD_BOT_API_TOKEN } from './auth-constants';
import { ALL_COMMANDS } from './commands/index';

console.log("Bot is starting...");

const client = new Client({
    intents: []
});

async function registerCommand (client: Client, guild: Guild, command: RESTPostAPIApplicationCommandsJSONBody[]) {
    const rest = new REST({ version: "9" }).setToken(DISCORD_BOT_API_TOKEN);
    const userID = client.user?.id || "No ID"
    console.log(`${userID} -- ${guild.id}\n${command}`);
    await rest.put(
        Routes.applicationGuildCommands(userID, guild.id), { body: command });
}

client.once('ready', () => {
    const delayedRegistration = setInterval(() => {
        clearInterval(delayedRegistration);
        let commands = ALL_COMMANDS.map(cmd => cmd.data.toJSON());
        client.guilds.cache.forEach(guild => {
            ALL_COMMANDS.forEach(cmd => {
                registerCommand(client, guild, commands );
            })
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

    console.log(interaction);
	const command = commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(DISCORD_BOT_API_TOKEN)

console.log(client);
