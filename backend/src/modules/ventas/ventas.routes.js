const express = require('express');
const router = express.Router();
const verificarToken = require('../auth/auth.middleware');
const checkRole = require('../auth/role.middleware');

const {
  crearVenta,
  listarVentas,
  obtenerVentaDetalle
} = require('./ventas.controller');

router.post('/', verificarToken, checkRole('admin', 'vendedor'), crearVenta);
router.get('/', verificarToken, checkRole('admin', 'vendedor'), listarVentas);
router.get('/:id', verificarToken, checkRole('admin', 'vendedor'), obtenerVentaDetalle);

module.exports = router;