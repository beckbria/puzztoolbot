import { ChatInputCommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders';
import { CaesarString } from 'puzzle-lib'

const CaesarCommand = {
    data: new SlashCommandBuilder()
        .setName('caesar')
        .setDescription('Caesar Cipher')
        .addStringOption(option => 
            option
                .setName('input')
                .setDescription('Ciphertext')
                .setRequired(true)
            )
        .addStringOption(option => 
            option
                .setName('shift')
                .setDescription('Shift (optional)')
                .setRequired(false)
            ),
    
    async execute(interaction: ChatInputCommandInteraction) {
        const input = interaction.options.getString('input');
        const shift = interaction.options.getInteger('shift');
        if (input === null) {
            await interaction.reply("Internal Error: null input");
        } else {
            if (shift === null) {
                await interaction.reply(new CaesarString(input).getRotations().join('\n'));
            } else {
                await interaction.reply(new CaesarString(input).getRotation(shift))
            }
        }
        ;
    }
};

export { CaesarCommand } ;

