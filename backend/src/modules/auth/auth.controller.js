const service = require('./auth.service');
const jwt = require('jsonwebtoken');

// 🔹 Registro
const register = async (req, res) => {
  try {
    const user = await service.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Login
const login = async (req, res) => {
  try {
    const user = await service.loginUser(req.body);

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        rol: user.rol,
      },
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};