require('dotenv').config();

export const config = {
    token: process.env.DISCORD_TOKEN,
    db: {
        url: process.env.TURSO_URL,
        authToken: process.env.TURSO_DB_TOKEN,
    },
    allowedUsers: process.env.ALLOWED_USERS.split(', '),
}