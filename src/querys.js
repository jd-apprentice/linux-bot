import { db } from './db';

/**
 * @param {import("kysely/dist/cjs/parser/insert-values-parser").InsertExpression<any, "users">} user
 */
export async function createUser(user) {
  return await db
    .insertInto('users')
    .values(user)
    .returningAll()
    .executeTakeFirst();
}

/**
 * @param {string} userId
 */
export async function deleteUser(userId) {
  return await db
    .deleteFrom('users')
    .where('id', '=', userId)
    .returningAll()
    .executeTakeFirst();
}

/**
 * @param {string} username
 */
export async function findUserByUsername(username) {
  return await db
    .selectFrom('users')
    .selectAll()
    .where('username', '=', username)
    .executeTakeFirst();
}

/**
 * @param {string} username
 */
export async function commandsAndChannels(username) {
  return await db
    .selectFrom('users')
    .select(['allowed_commands', 'allowed_channels'])
    .where('username', '=', username)
    .executeTakeFirst();
}
