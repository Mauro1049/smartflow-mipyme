const service = require('./dashboard.service');
const { exec } = require('child_process');
const path = require('path');

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

const prediccionVentas = async (req, res) => {
  const scriptPath = path.join(__dirname, '../../predict.py');

  exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('ERROR PYTHON:', error);
      return res.status(500).json({ error: 'Error ejecutando predicción' });
    }

    if (stderr) {
      console.error('STDERR:', stderr);
    }

    try {
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (err) {
      console.error('JSON ERROR:', err);
      res.status(500).json({ error: 'Error procesando respuesta de Python' });
    }
  });
};

module.exports = {
  resumen,
  ventasPorDia,
  topProductos,
  topClientes,
  lowStock,
  prediccionVentas
};