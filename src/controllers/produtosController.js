const ProdutosModel = require('../models/produtosModel');
const ProdutoImagensController = require('./produtoImagemController');

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
            const { minPrice, maxPrice, marca, ...restFilters } = req.query;

            const filters = [];

            if (minPrice) filters.push({ coluna: 'produtos.preco', operador: '>=', valor: minPrice });
            if (maxPrice) filters.push({ coluna: 'produtos.preco', operador: '<=', valor: maxPrice });

            if (marca) {
                filters.push({
                    coluna: 'marcas.nome',
                    operador: 'in',
                    valor: Array.isArray(marca) ? marca : [marca]
                });
            }

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
            const { tags } = req.body;
    
            console.log('Tags recebidas:', tags);
    
            const novoProduto = {
                nome: req.body.nome,
                descricao: req.body.descricao || null,
                preco: req.body.preco ? parseFloat(req.body.preco) : null,
                categoria: req.body.categoria,
                quantidade: req.body.quantidade ? parseInt(req.body.quantidade, 10) : null,
                modelo: req.body.modelo || null,
                fabricante: req.body.fabricante || null,
                data_fabricacao: req.body.data_fabricacao || null,
                data_validade: req.body.data_validade || null,
                marca_id: req.body.marca_id ? parseInt(req.body.marca_id, 10) : null,
            };
    
            const id = await ProdutosModel.create(novoProduto);
            const idProduto = id[0].id;

            console.log(idProduto);
            
            // Processar e salvar as tags vinculadas ao produto
            if (tags && Array.isArray(tags) && tags.length > 0) {
                const tagIds = tags.map((tag) => parseInt(tag, 10)); // Converte para inteiros
                console.log('IDs das Tags:', tagIds);
    
                await ProdutosModel.addTags(idProduto, tagIds);
            }
    
            // Salvar as imagens vinculadas ao produto (se houver)
            if (req.files && req.files.length > 0) {
                for (const file of req.files) {
                    // Criar um objeto simulado para passar ao método `upload`
                    const mockReq = {
                        ...req,
                        params: { idProduto },
                        file,
                    };
                    const mockRes = {
                        status: () => ({ json: () => {} }),
                    };
    
                    // Chama o método `upload` do ProdutoImagensController
                    await ProdutoImagensController.upload(mockReq, mockRes);
                }
            }
    
            res.status(201).json({ message: 'Produto criado com sucesso.', idProduto });
        } catch (error) {
            console.error('Erro ao criar produto:', error);
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
