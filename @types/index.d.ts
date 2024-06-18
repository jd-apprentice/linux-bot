import { Message } from "discord.js";
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            DISCORD_TOKEN: string;
            TURSO_URL: string;
            TURSO_DB_TOKEN: string;
        }
    }
}

export interface User {
    [x: string]: any;
    length: number;
    id: number;
    username: string;
    is_authorized: 0 | 1;
}

export interface Actions {
    allowed_channels: string;
    allowed_commands: string;
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
 * @property { string } db.url - Turso URL
 * @property { string } db.authToken - Turso DB Token
 */
export interface BotConfig {
    token: string;
    db: {
        url: string,
        authToken: string,
    }
}

/**
 * @property { Error } error - Message error
 */
export type onError = (error: Error) => void;
export type sendMessage = (message: Message) => void;

export { };