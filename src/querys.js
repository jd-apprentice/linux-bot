import { db } from './db';

export async function createUser(user) {
  return await db
    .insertInto('users')
    .values(user)
    .returningAll()
    .executeTakeFirst();
}

export async function deleteUser(userId) {
  return await db
    .deleteFrom('users')
    .where('id', '=', userId)
    .returningAll()
    .executeTakeFirst();
}

export async function findUserByUsername(username) {
  return await db
    .selectFrom('users')
    .selectAll()
    .where('username', '=', username)
    .executeTakeFirst();
}

export async function commandsAndChannels(username) {
  return await db
    .selectFrom('users')
    .select(['allowed_commands', 'allowed_channels'])
    .where('username', '=', username)
    .executeTakeFirst();
}
