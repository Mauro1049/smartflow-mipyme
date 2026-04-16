const service = require('./productos.service');

// Crear
const crearProducto = async (req, res) => {
  try {
    const producto = await service.createProducto(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar
const listarProductos = async (req, res) => {
  try {
    const productos = await service.getProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener por ID
const obtenerProducto = async (req, res) => {
  try {
    const producto = await service.getProductoById(req.params.id);

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
const actualizarProducto = async (req, res) => {
  try {
    const producto = await service.updateProducto(
      req.params.id,
      req.body
    );

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
const eliminarProducto = async (req, res) => {
  try {
    const producto = await service.deleteProducto(req.params.id);

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
};