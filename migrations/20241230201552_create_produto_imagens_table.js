exports.up = function (knex) {
    return knex.schema.createTable('produto_imagens', (table) => {
      table.increments('id').primary();
      table.integer('produto_id').unsigned().notNullable();
      table.foreign('produto_id').references('id').inTable('produtos').onDelete('CASCADE');
      table.string('caminho').notNullable();
      table.string('descricao').nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('produto_imagens');
  };
  