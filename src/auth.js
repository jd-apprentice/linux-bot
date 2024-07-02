import { findUserByUsername, commandsAndChannels } from './querys';
import { Message } from 'discord.js';

/**
 * @typedef { import("#types").User } User
 * @typedef { import("#types").Actions } Actions
 */

/**
 * @description Check if the user is authorized to use the bot
 * @param { Message } message - The message object
 * @returns { Promise<boolean | undefined | number> } - Returns a truthy value if the user is authorized
 */

export async function isAuthorized(message) {
  const { content } = message;
  const { username } = message.author;
  const { id } = message.channel;

  /** @type { User | undefined } */
  const user = await findUserByUsername(username);

  if (!user) return;

  /** @type { Actions | undefined } */
  const actions = await commandsAndChannels(username);

  if (!actions) return;

  const { allowed_commands, allowed_channels } = actions;

  const { is_authorized: isAuth } = user;

  if (!isAuth) return;

  const [arrCommands, arrChannels] = [
    allowed_commands?.split(', '),
    allowed_channels?.split(', '),
  ];

  const msg = content.split(' ');
  const command = msg[0];

  if (!arrCommands?.includes(command)) return;
  if (!arrChannels?.includes(id)) return;

  const isSameUser = user.username === message.author.username;
  return isSameUser && isAuth;
}
