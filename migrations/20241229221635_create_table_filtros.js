exports.up = function(knex) {
    return knex.schema.createTable('filtros', function(table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.integer('tag_id').references('id').inTable('tags').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('filtros');
};
