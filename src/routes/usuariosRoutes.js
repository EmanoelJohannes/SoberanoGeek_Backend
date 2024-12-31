const express = require('express');
const UsuarioModel = require('../models/usuariosModel');
const router = express.Router();

router.get('/', async (req, res) => {
    const usuarios = await UsuarioModel.findAll();
    res.json(usuarios);
});

router.post('/', async (req, res) => {
    const novoUsuario = await UsuarioModel.create(req.body);
    res.status(201).json(novoUsuario);
});

module.exports = router;
