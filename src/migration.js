/**
 * @description Generate a migration for the database
 * @param { import("kysely").Kysely<any> } database
 * @param { import("discord.js").Message } message
 * @returns { Promise<void> }
 */
export async function generateMigration(database, message) {
  let response;

  /**
   * @param {string} msg
   */
  const sendMessage = msg => message.channel.send(msg);
  const okMigration = 'Migration generated successfully!';
  const errMigration = 'Error generating migration: ';

  try {
    response = await database.schema
      .createTable('users')
      .addColumn('id', 'integer', column => column.primaryKey().autoIncrement())
      .addColumn('username', 'varchar', column => column.notNull())
      .addColumn('is_authorized', 'integer', column =>
        column.notNull().defaultTo(0),
      )
      .addColumn('allowed_commands', 'varchar', column =>
        column.notNull().defaultTo('whoami'),
      )
      .addColumn('allowed_channels', 'varchar', column =>
        column.notNull().defaultTo('1234'),
      )
      .execute();

    sendMessage(okMigration);
    console.info(okMigration);
  } catch (error) {
    sendMessage(`${errMigration} + ${error}`);
    console.error(errMigration, error);
  }

  return response;
}
