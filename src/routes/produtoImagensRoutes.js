const express = require('express');
const ProdutoImagensController = require('../controllers/produtoImagemController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post(
  '/:produtoId',
  upload.single('imagem'),
  ProdutoImagensController.upload
);

router.get('/:produtoId', ProdutoImagensController.listByProduct);

module.exports = router;
