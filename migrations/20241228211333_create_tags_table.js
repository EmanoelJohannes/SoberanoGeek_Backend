exports.up = function(knex) {
    return knex.schema.createTable('tags', function(table) {
        table.increments('id').primary();
        table.string('descricao').notNullable().unique();
        table.integer('parent_id').nullable().references('id').inTable('tags').onDelete('SET NULL');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tags');
};