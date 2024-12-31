exports.up = function(knex) {
    return knex.schema.createTable('produto_tags', function(table) {
        table.increments('id').primary();
        table.integer('produto_id').notNullable().references('id').inTable('produtos').onDelete('CASCADE');
        table.integer('tag_id').notNullable().references('id').inTable('tags').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('produto_tags');
};