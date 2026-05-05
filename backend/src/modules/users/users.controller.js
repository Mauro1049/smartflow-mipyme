const service = require('./users.service');

const createUsuario = async (req, res) => {
  try {
    const data = await service.createUsuario(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const data = await service.getUsuarios();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const data = await service.getUsuarioById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const data = await service.updateUsuario(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const data = await service.deleteUsuario(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
};