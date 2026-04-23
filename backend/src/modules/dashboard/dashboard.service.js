const pool = require('../../config/db');

// 🔥 1. Resumen general
const getResumen = async () => {
  const result = await pool.query(`
    SELECT 
      (SELECT COUNT(*) FROM clientes) AS total_clientes,
      (SELECT COUNT(*) FROM productos) AS total_productos,
      (SELECT COUNT(*) FROM ventas) AS total_ventas,
      (SELECT COALESCE(SUM(total),0) FROM ventas) AS ingresos_totales
  `);

  return result.rows[0];
};

// 🔥 2. Ventas por día
const getVentasPorDia = async () => {
  const result = await pool.query(`
    SELECT 
      DATE(fecha) AS dia,
      SUM(total) AS ingresos
    FROM ventas
    GROUP BY dia
    ORDER BY dia ASC
  `);

  return result.rows;
};

// 🔥 3. Top productos
const getTopProductos = async () => {
  const result = await pool.query(`
    SELECT 
      p.nombre,
      SUM(dv.cantidad) AS total_vendidos
    FROM detalle_ventas dv
    JOIN productos p ON dv.producto_id = p.id
    GROUP BY p.nombre
    ORDER BY total_vendidos DESC
    LIMIT 5
  `);

  return result.rows;
};

// 🔥 4. Top clientes
const getTopClientes = async () => {
  const result = await pool.query(`
    SELECT 
      c.nombre,
      SUM(v.total) AS total_comprado
    FROM ventas v
    JOIN clientes c ON v.cliente_id = c.id
    GROUP BY c.nombre
    ORDER BY total_comprado DESC
    LIMIT 5
  `);

  return result.rows;
};

// 🔥 5. Productos con bajo stock
const getLowStock = async () => {
  const result = await pool.query(`
    SELECT nombre, stock
    FROM productos
    WHERE stock <= 5
    ORDER BY stock ASC
  `);

  return result.rows;
};

module.exports = {
  getResumen,
  getVentasPorDia,
  getTopProductos,
  getTopClientes,
  getLowStock,
};