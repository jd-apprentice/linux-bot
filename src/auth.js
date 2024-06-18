import { Message } from 'discord.js';
import { findUserByUsername, commandsAndChannels } from "./querys";

/**
 * @description Check if the user is authorized to use the bot
 * @param { Message } message - The message object
 * @returns {Promise<boolean> | undefined } - Returns true if the user is authorized, otherwise returns undefined
 */

export async function isAuthorized(message) {

    const { content } = message;
    const { username } = message.author;
    const { id } = message.channel;

    /** @type { import("#types").User } */
    const user = await findUserByUsername(username);

    /** @type { import("#types").Actions } */
    const actions = await commandsAndChannels(username);

    const { allowed_commands, allowed_channels } = actions;

    const { is_authorized: isAuth } = user;

    const [arrCommands, arrChannels] = [allowed_commands.split(', '), allowed_channels.split(', ')];

    const msg = content.split(' ');
    const command = msg[0];

    if (!user) return;
    if (!isAuth) return;
    if (!arrCommands.includes(command)) return;
    if (!arrChannels.includes(id)) return;

    const isSameUser = user.username === message.author.username;
    const isAllowed = isSameUser && isAuth;
    return isAllowed;
};