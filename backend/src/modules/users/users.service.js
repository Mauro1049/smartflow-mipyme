const pool = require('../../config/db');
const bcrypt = require('bcrypt');

const createUsuario = async (data) => {
  const { email, password, rol } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO usuarios (email, password, rol)
     VALUES ($1, $2, $3)
     RETURNING id, email, rol, created_at`,
    [email, hashedPassword, rol || 'user']
  );

  return result.rows[0];
};

const getUsuarios = async () => {
  const result = await pool.query(
    'SELECT id, email, rol, created_at FROM usuarios'
  );
  return result.rows;
};

const getUsuarioById = async (id) => {
  const result = await pool.query(
    'SELECT id, email, rol, created_at FROM usuarios WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

const updateUsuario = async (id, data) => {
  const { email, password, rol } = data;

  let hashedPassword = null;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const result = await pool.query(
    `UPDATE usuarios
     SET email = COALESCE($1, email),
         password = COALESCE($2, password),
         rol = COALESCE($3, rol)
     WHERE id = $4
     RETURNING id, email, rol, created_at`,
    [email, hashedPassword, rol, id]
  );

  return result.rows[0];
};

const deleteUsuario = async (id) => {
  await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
  return { message: 'Usuario eliminado' };
};

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
};