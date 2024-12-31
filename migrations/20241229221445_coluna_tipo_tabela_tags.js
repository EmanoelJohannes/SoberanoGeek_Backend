exports.up = function(knex) {
    return knex.schema.alterTable('tags', function(table) {
        table.string('tipo').nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('tags', function(table) {
        table.dropColumn('tipo');
    });
};
