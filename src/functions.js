import { exec } from 'child_process';
import { isCommandAllowed } from './utils';
import { Message } from 'discord.js';

/**
 * @description Execute the command in the terminal
 * @param { Message } message - Discord message with the command
 * @param { string[] } allowedCommands - Allowed commands
 * @returns { void }
 */
export function executeCommand(message, allowedCommands) {

    if (!isCommandAllowed(message, allowedCommands)) {
        message.channel.send('This command is not allowed');
        return;
    }

    exec(message.content, (error, stdout, stderr) => {
        if (error) {
            message.channel.send(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            message.channel.send(`stderr: ${stderr}`);
            return;
        }
        message.channel.send(`stdout: \n${stdout}`);
    });
}

/**
 * @description Log the message in the console
 * @param { Message } message - Discord message with the command
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