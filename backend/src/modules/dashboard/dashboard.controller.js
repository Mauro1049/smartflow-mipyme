const service = require('./dashboard.service');

const resumen = async (req, res) => {
  try {
    const data = await service.getResumen();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const ventasPorDia = async (req, res) => {
  try {
    const data = await service.getVentasPorDia();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const topProductos = async (req, res) => {
  try {
    const data = await service.getTopProductos();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const topClientes = async (req, res) => {
  try {
    const data = await service.getTopClientes();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const lowStock = async (req, res) => {
  try {
    const data = await service.getLowStock();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  resumen,
  ventasPorDia,
  topProductos,
  topClientes,
  lowStock,
};