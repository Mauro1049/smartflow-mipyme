const service = require('./clientes.service');

// Crear
const crearCliente = async (req, res) => {
  try {
    const cliente = await service.createCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar
const listarClientes = async (req, res) => {
  try {
    const clientes = await service.getClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClienteById = async (req, res) => {
  try {
    const id = req.params.id; // ✅ aquí se define

    const cliente = await service.getClienteById(id);

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
const actualizarCliente = async (req, res) => {
  try {
    const cliente = await service.updateCliente(
      req.params.id,
      req.body
    );

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
const eliminarCliente = async (req, res) => {
  try {
    const cliente = await service.deleteCliente(req.params.id);

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  crearCliente,
  listarClientes,
  getClienteById,
  actualizarCliente,
  eliminarCliente
};