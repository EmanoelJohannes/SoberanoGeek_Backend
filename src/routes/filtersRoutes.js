const express = require('express');
const FiltersController = require('../controllers/FiltersController');

const router = express.Router();

router.get('/:tag', FiltersController.getFiltersByTag);

module.exports = router;
