const express = require('express');
const router = express.Router();
const verificarToken = require('../auth/auth.middleware');
const checkRole = require('../auth/role.middleware');

const controller = require('./users.controller');

// CRUD
router.post('/', verificarToken, checkRole('admin'), controller.createUsuario);
router.get('/', verificarToken, checkRole('admin'), controller.getUsuarios);
router.get('/:id', verificarToken, checkRole('admin'), controller.getUsuarioById);
router.put('/:id', verificarToken, checkRole('admin'), controller.updateUsuario);
router.delete('/:id', verificarToken, checkRole('admin'), controller.deleteUsuario);

module.exports = router;