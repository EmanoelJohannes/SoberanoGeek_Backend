exports.up = function(knex) {
    return knex.schema.createTable('valores_filtros', function(table) {
        table.increments('id').primary();
        table.string('valor').notNullable();
        table.integer('filtro_id').references('id').inTable('filtros').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('valores_filtros');
};
