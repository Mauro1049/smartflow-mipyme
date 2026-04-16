const pool = require('../../config/db');

const crearVenta = async ({ cliente_id, productos }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    let total = 0;

    // 🔹 Calcular total
    for (const item of productos) {
      const result = await client.query(
        'SELECT precio FROM productos WHERE id=$1',
        [item.producto_id]
      );

      if (result.rows.length === 0) {
        throw new Error(`Producto con id ${item.producto_id} no existe`);
    }

    const precio = result.rows[0].precio;
      total += precio * item.cantidad;
    }

    // 🔹 Insertar venta
    const ventaResult = await client.query(
      'INSERT INTO ventas(cliente_id, total) VALUES($1,$2) RETURNING *',
      [cliente_id, total]
    );

    const venta = ventaResult.rows[0];

    // 🔹 Insertar detalle
    for (const item of productos) {
      const result = await client.query(
        'SELECT precio FROM productos WHERE id=$1',
        [item.producto_id]
      );

      const precio = result.rows[0].precio;
      const subtotal = precio * item.cantidad;

      await client.query(
        `INSERT INTO detalle_ventas(venta_id, producto_id, cantidad, subtotal)
         VALUES($1,$2,$3,$4)`,
        [venta.id, item.producto_id, item.cantidad, subtotal]
      );

      // 🔥 OPCIONAL: actualizar stock
      await client.query(
        'UPDATE productos SET stock = stock - $1 WHERE id=$2',
        [item.cantidad, item.producto_id]
      );
    }

    await client.query('COMMIT');

    return venta;

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const getVentaDetalle = async (id) => {
  const result = await pool.query(`
    SELECT 
      v.id,
      v.fecha,
      v.total,
      c.nombre AS cliente,
      p.nombre AS producto,
      dv.cantidad,
      dv.subtotal
    FROM ventas v
    JOIN clientes c ON v.cliente_id = c.id
    JOIN detalle_ventas dv ON v.id = dv.venta_id
    JOIN productos p ON dv.producto_id = p.id
    WHERE v.id = $1
  `, [id]);

  if (result.rows.length === 0) return null;

  // 🔥 Formatear respuesta
  const venta = {
    id: result.rows[0].id,
    fecha: result.rows[0].fecha,
    total: result.rows[0].total,
    cliente: result.rows[0].cliente,
    productos: result.rows.map(row => ({
      nombre: row.producto,
      cantidad: row.cantidad,
      subtotal: row.subtotal
    }))
  };

  return venta;
};

const getVentas = async () => {
  const result = await pool.query(
    'SELECT * FROM ventas ORDER BY id DESC'
  );
  return result.rows;
};

module.exports = {
  crearVenta,
  getVentas,
  getVentaDetalle
};