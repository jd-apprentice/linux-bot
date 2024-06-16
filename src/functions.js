import { exec } from 'child_process';
import { noOutputMessage } from './constants';
import { Message } from 'discord.js';
import { isAuthorized } from './auth';

/**
 * @description Execute the command in the terminal
 * @param { Message } message - Discord message with the command
 * @returns { void }
 */
export async function executeCommand(message) {

    const auth = await isAuthorized(message);

    /** @type { import("#types").sendMessage } */
    const sendMessage = (text) => message.channel.send(text);

    if (!auth) {
        sendMessage("You are not authorized to use this bot.");
        return;
    }

    const { content } = message;

    const msg = content.split(' ');
    const command = msg[0];
    const args = content.slice(1).join(' ');

    if (!args && command == 'searchsploit') {
        sendMessage('Usage: searchsploit <search>');
        return;
    }

    if (!args && command == 'nmap') {
        sendMessage('Usage: nmap <args> <target>');
        return;
    }

    sendMessage(`🔍 Command: ${command}\n📝 Args: ${args}`);
    // TODO: content[BASE_TYPE_MAX_LENGTH]: Must be 2000 or fewer in length.
    exec(command + " " + args, (error, stdout, stderr) => {

        sendMessageIfLong({
            notification: "❌ Stderr too long ❌",
            std: stderr,
            maxLength: 1900,
            sendMessage
        });

        sendMessageIfLong({
            notification: "❌ Stdout too long ❌",
            std: stdout,
            maxLength: 1900,
            sendMessage
        });

        sendMessageIfLong({
            notification: "❌ Error too long ❌",
            std: error,
            maxLength: 1900,
            sendMessage
        });

        sendMessage(stdout || stderr || error || noOutputMessage + "executeCommand");
    });
}

/**
 * @description Notify the user that the message is too long
 * @param { string } notification - Message to notify the user
 * @param { string } std - Content to be evaluated
 * @param { number } maxLength - Max length of the message
 * @param { Function } fn - Function to send the message
 * @returns { boolean }
 */
function sendMessageIfLong(options = {}) {

    const { notification, std, maxLength, sendMessage } = options;
    const notificationMessage = notification + "sending in parts...";
    const delay = 2000;
    const isStdValid = std !== null;

    if (isStdValid) {
        const isLargeMessage = std.length > maxLength;
        if (isLargeMessage) {
            sendMessage(notificationMessage || noOutputMessage + "sendMessageIfLong");
            sleep(delay);
            const splitMessage = splitString(std, maxLength);
            splitMessage.forEach((part) => sendMessage(part));
        }
    }

    return;
}

/**
 * @param { string } str - String to be split
 * @param { number } maxLength - Max length of the message
 * @returns { string[] }
 */
function splitString(str, maxLength) {
    const regex = new RegExp(`.{1,${maxLength}}`, 'g');
    return str.match(regex) || [];
}

/**
 * @description Log the message in the console
 * @param { Message } message - Discord message with the command
 * @param { string } user - Discord user
 * @returns { void }
 */
export function infoMessage(message, user) {

    const { hostname, arch, platform } = require('os')
    const additonalInfo = {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        platform: platform(),
        host: hostname(),
        arch: arch(),
        user
    };

    const colors = '\x1b[36m%s\x1b[0m';

    console.info(colors, message, additonalInfo);
}

/**
 * @description Log the error message in the console
 * @param { string } error - Error message
 * @returns { void }
 */
export function errorMessage(error) {
    const colors = '\x1b[31m%s\x1b[0m';
    console.error(colors, error);
}