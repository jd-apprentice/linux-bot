import { Message } from 'discord.js';

/**
 * @description Check if the message is a bot
 * @param { Message } message 
 * @returns { boolean } 
 */
export const isBot = (message) => message.author.bot;

/**
 * @description Check if the message is from the desired channel
 * @param { Message } message 
 * @param { string } channelId 
 * @returns { boolean } 
 */
export const isNotSelectedChannel = (message, channelId) => message.channelId !== channelId;

/**
 * @description Check if the message is asking for help
 * @param { Message } message
 * @returns { boolean }
 */
export const isAskForHelp = (message) => message.content === '!help';

/**
 * @description Check if the message contains the command
 * @param { Message } message
 * @param { string [] } commands - Array of commands
 * @returns { boolean } 
 */
export const isCommandAllowed = (commands, message) => commands.includes(message);
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));