exports.up = async function (knex) {
    await knex.schema.table('produtos', (table) => {
      table.dropColumn('marca');
      table.integer('marca_id').unsigned().nullable();
      table
        .foreign('marca_id')
        .references('id')
        .inTable('marcas')
        .onDelete('SET NULL');
    });
  };
  
  exports.down = async function (knex) {
    await knex.schema.table('produtos', (table) => {
      table.string('marca').nullable();
      table.dropForeign('marca_id');
      table.dropColumn('marca_id');
    });
  };
  