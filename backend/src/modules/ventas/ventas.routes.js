const express = require('express');
const router = express.Router();

const {
  crearVenta,
  listarVentas,
  obtenerVentaDetalle
} = require('./ventas.controller');

router.post('/', crearVenta);
router.get('/', listarVentas);
router.get('/:id', obtenerVentaDetalle);

module.exports = router;