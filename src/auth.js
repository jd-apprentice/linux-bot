import { config } from "#config";
import { findUserByUsername } from "./querys";

/**
 * @description Check if the user is authorized to use the bot
 * @param {string} username - The username of the user
 * @returns {Promise<boolean> | undefined } - Returns true if the user is authorized, otherwise returns undefined
 */

export async function isAuthorized(username) {
    /** @type { import("#types").User } */
    const dbUser = await findUserByUsername(username);

    if (!dbUser) {
        return;
    }

    const { is_authorized } = dbUser;

    if (!is_authorized) {
        return;
    }

    const isUserAllowed = config.allowedUsers.includes(dbUser.username);
    return isUserAllowed;
};