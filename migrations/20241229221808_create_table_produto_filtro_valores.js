exports.up = function(knex) {
    return knex.schema.createTable('produto_filtro_valores', function(table) {
        table.increments('id').primary();
        table.integer('produto_id').references('id').inTable('produtos').onDelete('CASCADE');
        table.integer('valor_filtro_id').references('id').inTable('valores_filtros').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('produto_filtro_valores');
};
