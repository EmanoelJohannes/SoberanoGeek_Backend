exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function(table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('sexo').notNullable();
        table.string('email').notNullable().unique();
        table.string('senha').notNullable();
        table.string('telefone').nullable();
        table.string('celular').nullable();
        table.string('endereco').nullable();
        table.string('cidade').nullable();
        table.string('estado').nullable();
        table.string('cep').nullable();
        table.date('data_nascimento').nullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
