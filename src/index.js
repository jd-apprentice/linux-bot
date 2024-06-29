/* linux-bot -- A Discord bot that helps you with Linux commands
 *
 * -----------------------------------------------------------------------
 *
 * Author: Jonathan Dyallo
 * GNU General Public License v3.0
 *
 * Copyright (c) 2024 Jonathan <contacto at jonathan dot com dot ar>
 * 
 * All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Client, GatewayIntentBits } from 'discord.js';
import { isBot, isHelp } from './utils';
import { helpMessage, loginMessage } from './constants';
import { errorMessage, executeCommand, infoMessage } from './functions';

/**
 * @example
    import { LinuxBot } from 'linux-bot';
    import { config } from '#config';

    new LinuxBot({
        config
    });

    @description This is the main class of the bot, it is responsible for starting the bot and listening to the events
    @returns {void}
 */

export class LinuxBot {
    /** @type { import("#types").BotConfig } */
    #config;
    #client;

    /** 
     * @param { Object } options
     * @param { import("#types").BotConfig } options.config
     */

    constructor(options) {
        this.#config = options.config;
        this.#client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ],
        });

        this.#client.login(this.#config.token);
        this.#client.on('ready', this.#onReady.bind(this));
        this.#client.on('messageCreate', this.#onMessage.bind(this));
        this.#client.on('error', this.#onError.bind(this));
    }

    /** @type { import("#types").onError } */
    async #onError(error) {
        errorMessage(error);
    }

    /** @type { import("#types").sendHelpMessage } */
    async #sendHelpMessage(message) {
        await message.channel.send(helpMessage);
    }

    /** @type { import("#types").onReady } */
    async #onReady() {
        infoMessage(loginMessage, this.#client.user.tag);
    };

    /** @type { import("#types").onMessage } */
    async #onMessage(message) {
        if (isBot(message)) return;
        if (isHelp(message)) return this.#sendHelpMessage(message);

        executeCommand(message);
    }
}