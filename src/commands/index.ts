import { AutoKeyCommand } from './autokey';
import { CaesarCommand } from './caesar';
import { MorseCommand } from './morse';
import { VigenereCommand } from './vigenere';

const ALL_COMMANDS = [
    AutoKeyCommand,
    CaesarCommand,
    MorseCommand,
    VigenereCommand
];

export {
    ALL_COMMANDS,
    AutoKeyCommand,
    CaesarCommand,
    MorseCommand,
    VigenereCommand
};