const pool = require('../../config/db');

// Crear producto
const createProducto = async ({ nombre, precio, stock, categoria }) => {
  const result = await pool.query(
    `INSERT INTO productos(nombre, precio, stock, categoria)
     VALUES($1,$2,$3,$4) RETURNING *`,
    [nombre, precio, stock, categoria]
  );
  return result.rows[0];
};

// Listar productos
const getProductos = async () => {
  const result = await pool.query(
    'SELECT * FROM productos ORDER BY id DESC'
  );
  return result.rows;
};

// Obtener por ID
const getProductoById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM productos WHERE id=$1',
    [id]
  );
  return result.rows[0];
};

// Actualizar
const updateProducto = async (id, { nombre, precio, stock, categoria }) => {
  const result = await pool.query(
    `UPDATE productos 
     SET nombre=$1, precio=$2, stock=$3, categoria=$4
     WHERE id=$5 RETURNING *`,
    [nombre, precio, stock, categoria, id]
  );
  return result.rows[0];
};

// Eliminar
const deleteProducto = async (id) => {
  const result = await pool.query(
    'DELETE FROM productos WHERE id=$1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createProducto,
  getProductos,
  getProductoById,
  updateProducto,
  deleteProducto,
};