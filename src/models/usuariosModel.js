const db = require('../db/knex');

class UsuariosModel {
    static async findAll() {
        return await db('usuarios').select('*');
    }

    static async findById(id) {
        return await db('usuarios').where({ id }).first();
    }

    static async create(data) {
        const [id] = await db('usuarios').insert(data).returning('id');
        return { id };
    }

    static async update(id, data) {
        return await db('usuarios').where({ id }).update(data);
    }

    static async delete(id) {
        return await db('usuarios').where({ id }).del();
    }
}

module.exports = UsuariosModel;
