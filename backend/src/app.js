const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Importar rutas
const clientesRoutes = require('./modules/clientes/clientes.routes');

// 🔹 Ruta base
app.get('/', (req, res) => {
  res.send('API SmartFlow funcionando 🚀');
});

// 🔹 Rutas de clientes
app.use('/api/clientes', clientesRoutes);

// 🔹 Puerto
const PORT = process.env.PORT || 3000;

// 🔹 Levantar servidor
app.listen(PORT, () => {
  console.log(`SERVIDOR ACTIVO EN PUERTO ${PORT}`);
});