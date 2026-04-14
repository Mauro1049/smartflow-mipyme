const express = require('express');
const router = express.Router();

const {
  crearCliente,
  listarClientes,
  getClienteById,
  actualizarCliente,
  eliminarCliente
} = require('./clientes.controller');

router.post('/', crearCliente);
router.get('/', listarClientes);
router.get('/:id', getClienteById);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);

module.exports = router; // 👈 ESTO ES CLAVE