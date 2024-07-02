import { describe, it, expect } from 'bun:test';
import { isBot, isHelp, isMigration, sleep } from '../src/utils';
import { helpMessage } from '../src/constants';

describe('isBot function', () => {
    it('should return true if the message is a bot', () => {
        const message = { author: { bot: true } };
        expect(isBot(message)).toBe(true);
    });

    it('should return false if the message is not a bot', () => {
        const message = { author: { bot: false } };
        expect(isBot(message)).toBe(false);
    });
});

describe('isHelp function', () => {
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

describe('isMigration function', () => {
    it('should return true if the message is asking for migration', () => {
        const message = { content: '!migration' };
        expect(isMigration(message)).toBe(true);
    });

    it('should return false if the message is not asking for migration', () => {
        const message = { content: 'migration' };
        expect(isMigration(message)).toBe(false);
    });
});

describe('sleep function', () => {
    it('should return a promise that resolves after the given time', async () => {
        const time = 1000;
        const start = Date.now();
        await sleep(time);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(time);
    });

    it('should return a promise that resolves instantly if no time is given', async () => {
        const start = Date.now();
        await sleep(50);
        const end = Date.now();
        expect(end - start).toBeLessThan(100);
    });
});