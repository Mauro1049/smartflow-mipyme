const express = require('express');
const router = express.Router();

const {
  resumen,
  ventasPorDia,
  topProductos,
  topClientes,
  lowStock,
} = require('./dashboard.controller');

router.get('/resumen', resumen);
router.get('/ventas-por-dia', ventasPorDia);
router.get('/top-productos', topProductos);
router.get('/top-clientes', topClientes);
router.get('/low-stock', lowStock);

module.exports = router;