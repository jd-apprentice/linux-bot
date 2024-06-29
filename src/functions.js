import { exec } from 'child_process';
import { errMessage, noOutputMessage, unathorizedMessage } from './constants';
import { isAuthorized } from './auth';
import { sleep } from './utils';

/**
 * @description Execute the command in the terminal
 * @param { import("discord.js").Message } message - Discord message with the command
 * @returns { Promise<void> }
 */
export async function executeCommand(message) {
  /**
   * @param {string} text - Text to be sent
   */
  const sendMessage = text => message.channel.send(text);

  const auth = await isAuthorized(message);

  if (!auth) {
    sendMessage(unathorizedMessage);
    return;
  }

  const content = message.content.split(' ');
  const command = content[0];
  const noArgs = content.length === 1;

  if (noArgs && command == 'searchsploit') {
    sendMessage('Usage: searchsploit <search>');
    return;
  }

  if (noArgs && command == 'nmap') {
    sendMessage('Usage: nmap <args> <target>');
    return;
  }

  const args = content.slice(1).join(' ');

  sendMessage(`🔍 Command: ${command}\n📝 Args: ${args}`);

  // TODO: content[BASE_TYPE_MAX_LENGTH]: Must be 2000 or fewer in length.
  exec(command + ' ' + args, (error, stdout, stderr) => {
    sendMessageIfLong({
      notification: '❌ Stderr too long ❌',
      std: stderr,
      maxLength: 1900,
      fn: sendMessage,
    });

    sendMessageIfLong({
      notification: errMessage,
      std: errMessage,
      maxLength: 1900,
      fn: sendMessage,
    });

    sendMessageIfLong({
      notification: '❌ Stdout too long ❌',
      std: stdout,
      maxLength: 1900,
      fn: sendMessage,
    });

    sendMessage(
      stdout || stderr || error?.stdout || noOutputMessage + 'executeCommand',
    );
  });
}

/**
 * @description Notify the user that the message is too long
 * @param { Object } options - Options object
 * @param { string } options.notification - Message to notify the user
 * @param { string } options.std - Content to be evaluated
 * @param { number } options.maxLength - Max length of the message
 * @param { import("#types").sendMessage } options.fn - Function to send the message
 * @returns { undefined }
 */
function sendMessageIfLong(options) {
  const { notification, std, maxLength, fn } = options;
  const notificationMessage = notification + 'sending in parts...';
  const delay = 2000;
  const isStdValid = std !== null;

  if (isStdValid) {
    const isLargeMessage = std.length > maxLength;
    if (isLargeMessage) {
      fn(notificationMessage || noOutputMessage + 'sendMessageIfLong');
      sleep(delay);
      const splitMessage = splitString(std, maxLength);
      splitMessage.forEach(part => fn(part));
    }
  }
}

/**
 * @param { string } str - String to be split
 * @param { number } maxLength - Max length of the message
 * @returns { string[] }
 */
function splitString(str, maxLength) {
  const regex = new RegExp(`.{1,${maxLength}}`, 'g');
  return regex.exec(str) || [];
}

/**
 * @description Log the message in the console
 * @param { string } message - Discord message with the command
 * @param { string } user - Discord user
 * @returns { void }
 */
export function infoMessage(message, user) {
  const { hostname, arch, platform } = require('os');
  const additonalInfo = {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    platform: platform(),
    host: hostname(),
    arch: arch(),
    user,
  };

  const colors = '\x1b[36m%s\x1b[0m';

  console.info(colors, message, additonalInfo);
}

/**
 * @description Log the error message in the console
 * @param { Error } error - Error message
 * @returns { void }
 */
export function errorMessage(error) {
  const colors = '\x1b[31m%s\x1b[0m';
  console.error(colors, error);
}
