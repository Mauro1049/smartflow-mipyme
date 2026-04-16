const service = require('./ventas.service');

const crearVenta = async (req, res) => {
  try {
    const venta = await service.crearVenta(req.body);
    res.status(201).json(venta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarVentas = async (req, res) => {
  try {
    const ventas = await service.getVentas();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerVentaDetalle = async (req, res) => {
  try {
    const venta = await service.getVentaDetalle(req.params.id);

    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearVenta,
  listarVentas,
  obtenerVentaDetalle
};