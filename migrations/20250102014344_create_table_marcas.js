exports.up = async function (knex) {
    await knex.schema.createTable('marcas', (table) => {
      table.increments('id').primary();
      table.string('nome').notNullable().unique();
      table.string('departamento').notNullable();
      table.text('descricao').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = async function (knex) {
    await knex.schema.dropTable('marcas');
  };
  