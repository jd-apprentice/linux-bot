export async function generateMigration(database) {
    return await database
        .schema
        .createTable("users")
        .addColumn("id", "integer", (column) => column.primaryKey().autoIncrement())
        .addColumn("username", "varchar", (column) => column.notNull())
        .addColumn("is_authorize", "boolean", (column) => column.notNull().default(false))
        .execute()
}