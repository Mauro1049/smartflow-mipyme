const express = require('express');
const router = express.Router();
const verifyToken = require('../auth/auth.middleware');
const checkRole = require('../auth/role.middleware');

const {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
} = require('./productos.controller');

router.post('/', verifyToken, checkRole('admin'), crearProducto);
router.get('/', verifyToken, checkRole('admin', 'vendedor'), listarProductos);
router.get('/:id', verifyToken, checkRole('admin', 'vendedor'), obtenerProducto);
router.put('/:id', verifyToken, checkRole('admin'), actualizarProducto);
router.delete('/:id', verifyToken, checkRole('admin'), eliminarProducto);

module.exports = router;