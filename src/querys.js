import { db } from "./db";

export async function createUser(user) {
    return await db.insertInto("users")
        .values(user)
        .returningAll()
        .executeTakeFirstOrThrow()
};

export async function deleteUser(userId) {
    return await db.deleteFrom("users")
        .where("id", '=', userId)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function findUserByUsername(username) {
    return await db
        .selectFrom("users")
        .selectAll()
        .where("username", '=', username)
        .executeTakeFirstOrThrow()
}