const knex = require('../db/knex');

const ProdutoImagensController = {
  async upload(req, res) {
    try {
      const { produtoId } = req.params;

      const produto = await knex('produtos').where({ id: produtoId }).first();
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      const caminho = `/uploads/produtos/${req.file.filename}`;
      const descricao = req.body.descricao || null;

      await knex('produto_imagens').insert({
        produto_id: produtoId,
        caminho,
        descricao,
      });

      res.status(201).json({ message: 'Imagem salva com sucesso.', caminho });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao fazer upload da imagem.' });
    }
  },

  async listByProduct(req, res) {
    try {
      const { produtoId } = req.params;

      const produto = await knex('produtos').where({ id: produtoId }).first();
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      const imagens = await knex('produto_imagens').where({ produto_id: produtoId }).select('id', 'caminho', 'descricao');

      if (imagens.length === 0) {
        return res.status(404).json({ message: 'Nenhuma imagem encontrada para este produto.' });
      }

      res.json(imagens);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar imagens do produto.' });
    }
  },
};

module.exports = ProdutoImagensController;
