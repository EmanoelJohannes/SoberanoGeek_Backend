const express = require('express');
const produtosController = require('../controllers/produtosController');
const router = express.Router();

// Lista produtos por tag com filtros
router.get('/tag/:tag', produtosController.listByTag);

// Listar todos os produtos
router.get('/', produtosController.list);

// Obter um produto por ID
router.get('/:id', produtosController.getById);

// Criar um novo produto
router.post('/', produtosController.create);

// Atualizar um produto existente
router.put('/:id', produtosController.update);

// Excluir um produto
router.delete('/:id', produtosController.delete);

module.exports = router;
