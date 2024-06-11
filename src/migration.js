export async function generateMigration(database, message) {
    let response;

    const sendMessage = (msg) => message.channel.send(msg);
    const okMigration = "Migration generated successfully!"
    const errMigration = "Error generating migration: ";

    try {
        response = await database
            .schema
            .createTable("users")
            .addColumn("id", "integer", (column) => column.primaryKey().autoIncrement())
            .addColumn("username", "varchar", (column) => column.notNull())
            .addColumn("is_authorized", "boolean", (column) => column.notNull().defaultTo(false))
            .execute()

        sendMessage(okMigration);
        console.info(okMigration);
    } catch (error) {
        sendMessage(errMigration, error);
        console.error(errMigration, error);
    }

    return response;
}