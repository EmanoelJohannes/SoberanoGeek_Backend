exports.up = function(knex) {
    return knex.schema.createTable('produtos', function(table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.text('descricao').nullable();
        table.decimal('preco', 10, 2).notNullable();
        table.string('categoria').notNullable();
        table.integer('quantidade').notNullable();
        table.string('marca').nullable();
        table.string('modelo').nullable();
        table.string('fabricante').nullable();
        table.date('data_fabricacao').nullable();
        table.date('data_validade').nullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('produtos');
};
