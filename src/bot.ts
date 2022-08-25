import { Client } from "discord.js";
import { API_KEY } from "./auth-constants"

console.log("Bot is starting...");

const client = new Client({
    intents: []
});

console.log(client);
console.log(API_KEY);
