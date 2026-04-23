const pool = require('../../config/db');
const bcrypt = require('bcryptjs');

// 🔹 Registrar usuario
const registerUser = async ({ email, password }) => {
  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    'INSERT INTO usuarios(email, password) VALUES($1,$2) RETURNING id, email, rol',
    [email, hash]
  );

  return result.rows[0];
};

// 🔹 Login
const loginUser = async ({ email, password }) => {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE email=$1',
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error('Usuario no existe');
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error('Contraseña incorrecta');
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
};