const knex = require('../db/knex');
const buildQuery = require('../utils/queryBuilder');

class ProdutosModel {
    static async findAll(filters = []) {
        const query = knex('produtos');
        return buildQuery(query, filters).select('*');
    }

    static async findById(id) {
        return await knex('produtos').where({ id }).first();
    }

    static async create(data) {
        return await knex('produtos').insert(data).returning('id');
    }

    static async update(id, data) {
        return await knex('produtos').where({ id }).update(data);
    }

    static async delete(id) {
        return await knex('produtos').where({ id }).del();
    }

    static async findByTagWithFilters(tag, filters) {
        const query = knex('produtos')
            .join('produto_tags', 'produtos.id', 'produto_tags.produto_id')
            .join('tags', 'produto_tags.tag_id', 'tags.id')
            .leftJoin('produto_filtro_valores', 'produtos.id', 'produto_filtro_valores.produto_id')
            .leftJoin('valores_filtros', 'produto_filtro_valores.valor_filtro_id', 'valores_filtros.id')
            .where('tags.descricao', tag)
            .select('produtos.*');
    
        return buildQuery(query, filters);
    }
}

module.exports = ProdutosModel;
