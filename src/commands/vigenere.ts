import {ChatInputCommandInteraction} from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
import {VigenereString} from 'puzzle-lib';

const VigenereCommand = {
  data: new SlashCommandBuilder()
    .setName('vigenere')
    .setDescription('Vigenere Cipher')
    .addStringOption(option =>
      option.setName('input').setDescription('Input').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('key').setDescription('Key').setRequired(true)
    )
    .addBooleanOption(option =>
      option.setName('encrypt').setDescription('Encrypt').setRequired(false)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const input = interaction.options.getString('input')!;
    const key = interaction.options.getString('key')!;
    const encrypt = interaction.options.getBoolean('encrypt') || false;

    const vig = new VigenereString(input, key);
    await interaction.reply(encrypt ? vig.encrypt() : vig.decrypt());
  },
};

export {VigenereCommand};
