import { Message } from 'discord.js';

/**
 * @description Check if the message is a bot
 * @param { Message } message 
 * @returns { boolean } 
 */
export const isBot = (message) => message.author.bot;

/**
 * @description Check if the message is asking for help
 * @param { Message } message
 * @returns { boolean }
 */
export const isHelp = (message) => message.content === '!help';

/**
 * @description Check if the message is asking for migration
 * @param { Message } message
 * @returns { boolean }
 */
export const isMigration = (message) => message.content === '!migration';
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));