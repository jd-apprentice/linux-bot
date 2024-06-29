/**
 * @description Check if the message is a bot
 * @param { Object } message
 * @param { Object } message.author
 * @param { boolean } message.author.bot
 * @returns { boolean } 
 */
export const isBot = (message) => message.author.bot ?? false;

/**
 * @description Check if the message is asking for help
 * @param { Object } message
 * @param { string } message.content
 * @returns { boolean }
 */
export const isHelp = (message) => message.content === '!help';

/**
 * @description Check if the message is asking for migration
 * @param { Object } message
 * @param { string } message.content
 * @returns { boolean }
 */
export const isMigration = (message) => message.content === '!migration';
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));