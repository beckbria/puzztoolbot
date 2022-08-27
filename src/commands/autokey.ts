import { ChatInputCommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders';
import { AutoKeyString } from 'puzzle-lib'

const AutoKeyCommand = {
    data: new SlashCommandBuilder()
        .setName('autokey')
        .setDescription('Autokey Cipher')
        .addStringOption(option =>
            option
                .setName('input')
                .setDescription('Input')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('key')
                .setDescription('Key')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option
                .setName('encrypt')
                .setDescription('Encrypt')
                .setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const input = interaction.options.getString('input')!;
        const key = interaction.options.getString('key')!;
        const encrypt = interaction.options.getBoolean('encrypt') || false;

        const aks = new AutoKeyString(input, key)
        await interaction.reply(encrypt ? aks.encrypt() : aks.decrypt());
    }
};

export { AutoKeyCommand };

