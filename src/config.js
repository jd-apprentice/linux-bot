export const config = {
    token: process.env.DISCORD_TOKEN,
    channelId: process.env.DISCORD_CHANNEL_ID,
    allowedCommands: process.env.ALLOWED_COMMANDS.split(', '),
}