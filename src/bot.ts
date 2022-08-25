import { Client } from 'discord.js';
import { API_KEY } from './auth-constants'
import { CaesarString } from 'puzzle-lib'

console.log("Bot is starting...");

const client = new Client({
    intents: []
});

console.log(client);
console.log(API_KEY);
console.log(new CaesarString("DEADBEEF").getRotation(13));