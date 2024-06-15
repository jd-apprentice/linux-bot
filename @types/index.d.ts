import { Message } from "discord.js";
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            DISCORD_TOKEN: string;
            DISCORD_CHANNEL_ID: string;
            ALLOWED_COMMANDS: string;
            ALLOWED_USERS: string;
            TURSO_URL: string;
            TURSO_DB_TOKEN: string;
        }
    }
}

// {
//     "0": 1,
//     "1": "dyallo.",
//     "2": "true",
//     length: 3,
//     id: 1,
//     username: "dyallo.",
//     is_authorized: "true",
//   }

export interface User {
    [x: string]: any;
    length: number;
    id: number;
    username: string;
    is_authorized: boolean;
}

/**
 * @callback onMessage Event that is triggered when a message is sent in the channel
 * @param {Message} message - The message that triggered the command
 * @returns {Promise<void>}
 */
export type onMessage = (message: Message) => Promise<void>;

/**
 * @callback onReady Event that is triggered when the bot is ready
 * @returns {Promise<void>}
 */
export type onReady = () => Promise<void>;

/**
 * @callback sendHelpMessage Function that sends the help message
 * @param {Message} message - The message that triggered the help command
 * @returns {Promise<void>}
 */
export type sendHelpMessage = (message: Message) => Promise<void>;

/**
 * @property { string } token - Discord bot token
 * @property { string } channelId - Discord channel id where the bot will be listening
 * @property { string[] } allowedCommands - Array of allowed commands
 */
export interface BotConfig {
    token: string;
    channelId: string;
    allowedCommands: string[];
}

/**
 * @property { Error } error - Message error
 */
export type onError = (error: Error) => void;
export type sendMessage = (message: Message) => void;

export { };