const pool = require('../../config/db');

// Crear cliente
const createCliente = async ({ nombre, telefono, email }) => {
  const result = await pool.query(
    'INSERT INTO clientes(nombre, telefono, email) VALUES($1,$2,$3) RETURNING *',
    [nombre, telefono, email]
  );

  return result.rows[0];
};

// Obtener todos
const getClientes = async () => {
  const result = await pool.query('SELECT * FROM clientes ORDER BY id DESC');
  return result.rows;
};

// Obtener por id 
const getClienteById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM clientes WHERE id = $1',
    [id]
  )
  return result.rows[0]
}

// Actualizar cliente
const updateCliente = async (id, { nombre, telefono, email }) => {
  const result = await pool.query(
    `UPDATE clientes 
     SET nombre=$1, telefono=$2, email=$3 
     WHERE id=$4 RETURNING *`,
    [nombre, telefono, email, id]
  );
  return result.rows[0];
};

// Eliminar cliente
const deleteCliente = async (id) => {
  const result = await pool.query(
    'DELETE FROM clientes WHERE id=$1 RETURNING *',
    [id]
  );
  return result.rows[0];
};



module.exports = {
  createCliente,
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente
};