import { describe, it, expect } from 'bun:test';
import { isBot, isHelp } from '../src/utils';
import { helpMessage } from '../src/constants';

describe('isBot file', () => {
    it('should return true if the message is a bot', () => {
        const message = { author: { bot: true } };
        expect(isBot(message)).toBe(true);
    });

    it('should return false if the message is not a bot', () => {
        const message = { author: { bot: false } };
        expect(isBot(message)).toBe(false);
    });

    it('should contain message.author.bot, else is a invalid message', () => {
        const message = { author: {} };
        expect(isBot(message)).toBe(false);
    });
});

describe('isHelp file', () => {
    it('should return true if the message is asking for help', () => {
        const message = { content: '!help' };
        expect(isHelp(message)).toBe(true);
    });

    it('should return false if the message is not asking for help', () => {
        const message = { content: 'help' };
        expect(isHelp(message)).toBe(false);
    });

    it('shoudl return the helpMessage if the message is asking for help', () => {
        const baseMessage =
            `
## Commands

**!help**: Display this message
**!migrate**: Migrate the database
**!searchsploit** [message]: Search for exploits in the exploit database
**!nmap** [args] [target]: Scan a target with nmap
    `
        const message = { content: '!help' };
        const response = isHelp(message);
        if (response) {
            expect(baseMessage).toBe(helpMessage);
        };
    });
});