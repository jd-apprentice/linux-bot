import { config } from "#config";
import { findUserByUsername } from "./querys";

export async function isAuthorized(username) {
    /** @type { import("#types").User } */
    const dbUser = await findUserByUsername(username);

    if (!dbUser) {
        return;
    }

    const { is_authorized } = dbUser;
    const isAllowed = is_authorized === "true";

    if (!isAllowed) {
        return;
    }

    const isUserAllowed = config.allowedUsers.includes(dbUser.username);
    return isUserAllowed;
};