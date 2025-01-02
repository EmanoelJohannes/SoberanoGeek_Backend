const ProdutosModel = require('../models/produtosModel');

const produtosController = {
    async list(req, res) {
        console.log('entrou no list')
        try {
            const produtos = await ProdutosModel.findAll();
            res.json(produtos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao listar produtos.' });
        }
    },

    async listByTag(req, res) {
        try {
            const { tag } = req.params;
            const { minPrice, maxPrice, ...restFilters } = req.query;
    
            const filters = [];
    
            if (minPrice) filters.push({ coluna: 'produtos.preco', operador: '>=', valor: minPrice });
            if (maxPrice) filters.push({ coluna: 'produtos.preco', operador: '<=', valor: maxPrice });
    
            const filtroValores = Object.entries(restFilters).map(([key, value]) => ({
                coluna: 'valores_filtros.valor',
                operador: 'in',
                valor: Array.isArray(value) ? value : [value]
            }));
    
            filters.push(...filtroValores);
    
            const produtos = await ProdutosModel.findByTagWithFilters(tag, filters);
    
            res.json(produtos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao listar produtos por tag.' });
        }
    },        

    async getById(req, res) {
        try {
            const { id } = req.params;
            const produto = await ProdutosModel.findById(id);

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            res.json(produto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar produto.' });
        }
    },

    async create(req, res) {
        try {
            const novoProduto = req.body;
            const id = await ProdutosModel.create(novoProduto);

            res.status(201).json({ id, message: 'Produto criado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar produto.' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const dadosAtualizados = req.body;

            const rowsAffected = await ProdutosModel.update(id, dadosAtualizados);

            if (rowsAffected === 0) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            res.json({ message: 'Produto atualizado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar produto.' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;

            const rowsAffected = await ProdutosModel.delete(id);

            if (rowsAffected === 0) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            res.json({ message: 'Produto excluído com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao excluir produto.' });
        }
    }
};

module.exports = produtosController;
