import { Client, ClientOptions } from 'discord.js';
import { DISCORD_BOT_API_TOKEN } from './auth-constants';
import { ALL_COMMANDS } from './commands/index';

console.log("Bot is starting...");

const client = new Client({
    intents: []
});

client.once('ready', () => {
	console.log('Ready!');
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
