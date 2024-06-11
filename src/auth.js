import { config } from "#config";
import { findUserByUsername } from "./querys";

export async function isAuthorized(username) {
    const dbUser = await findUserByUsername(username);

    if (!dbUser) {
        return;
    }

    if (!dbUser.is_authorized) {
        return;
    }

    const isUserAllowed = config.allowedUsers.includes(dbUser.username);
    return isUserAllowed;
};