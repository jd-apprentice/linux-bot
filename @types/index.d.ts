import { Message } from "discord.js";
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            DISCORD_TOKEN: string;
            ALLOWED_CHANNELS: string;
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
    is_authorized: 0 | 1;
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
 * @property { string } token
 * @property { string [] } allowedChannels
 * @property { string [] } allowedCommands
 */
export interface BotConfig {
    token: string;
    allowedChannels: string[];
    allowedCommands: string[];
}

/**
 * @property { Error } error - Message error
 */
export type onError = (error: Error) => void;
export type sendMessage = (message: Message) => void;

export { };