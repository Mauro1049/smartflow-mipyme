const express = require('express');
const router = express.Router();
const verificarToken = require('../auth/auth.middleware');
const checkRole = require('../auth/role.middleware');


const {
  crearCliente,
  listarClientes,
  getClienteById,
  actualizarCliente,
  eliminarCliente
} = require('./clientes.controller');

router.post('/', verificarToken, checkRole('admin', 'vendedor'), crearCliente);
router.get('/', verificarToken, checkRole('admin','vendedor'), listarClientes);
router.get('/:id', verificarToken, checkRole('admin', 'vendedor'), getClienteById);
router.put('/:id', verificarToken, checkRole('admin', 'vendedor'), actualizarCliente);
router.delete('/:id', verificarToken, checkRole('admin'), eliminarCliente);

module.exports = router; 