import {ChatInputCommandInteraction} from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
import {MorseString} from 'puzzle-lib';

const MorseCommand = {
  data: new SlashCommandBuilder()
    .setName('morse')
    .setDescription('Morse Code.  Separate letters with space and words with /')
    .addStringOption(option =>
      option.setName('text').setDescription('Text to encode').setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('morse')
        .setDescription('Morse code to decode')
        .setRequired(false)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const text = interaction.options.getString('text');
    const morse = interaction.options.getString('morse');
    if (text === null && morse === null) {
      await interaction.reply('No input supplied.');
      return;
    }

    if (text !== null) {
      // TODO: Add this support to puzzle-lib.  Probably needs major version bump for stream fucntions
      await interaction.reply('Not implemented');
    }

    if (morse !== null) {
      const morseString = new MorseString(morse, ' ', '/');
      const inverted = new MorseString(morse, ' ', '/').invertDotsAndDashes();

      await interaction.reply(
        `Plaintext: ${morseString.toString()}\nSwapped Dots/Dashes: ${inverted.toString()}`
      );
    }
  },
};

export {MorseCommand};
