const knex = require('../db/knex');

const FiltersController = {
  async getFiltersByTag(req, res) {
    try {
      const { tag } = req.params;

      const tagRecord = await knex('tags').where({ descricao: tag }).first();
      if (!tagRecord) {
        return res.status(404).json({ message: 'Tag não encontrada.' });
      }

      const filters = await knex('filtros')
        .where({ tag_id: tagRecord.id })
        .select('id', 'nome');

      const filtersWithValues = await Promise.all(
        filters.map(async (filter) => {
          const options = await knex('valores_filtros')
            .where({ filtro_id: filter.id })
            .select('id as value', 'valor as label');
          return {
            id: filter.id,
            name: filter.nome,
            options,
          };
        })
      );

      res.json({ filters: filtersWithValues });
    } catch (error) {
      console.error('Erro ao buscar filtros:', error);
      res.status(500).json({ message: 'Erro ao buscar filtros.' });
    }
  },
};

module.exports = FiltersController;
