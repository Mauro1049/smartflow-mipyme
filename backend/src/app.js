const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('dotenv').config({ path: '../.env' });

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Importar rutas
const clientesRoutes = require('./modules/clientes/clientes.routes');
const productosRoutes = require('./modules/productos/productos.routes');
const ventasRoutes = require('./modules/ventas/ventas.routes');
const dashboardRoutes = require('./modules/dashboard/dashboard.routes');
const authRoutes = require('./modules/auth/auth.routes');
const verificarToken = require('./modules/auth/auth.middleware');

app.use('/api/auth', authRoutes);

app.use('/api/dashboard', dashboardRoutes);

app.use('/api/ventas', verificarToken, ventasRoutes);

app.use('/api/productos', verificarToken, productosRoutes);

app.use('/api/clientes', clientesRoutes);

app.use('/api/dashboard', dashboardRoutes);

// 🔹 Ruta base
app.get('/', (req, res) => {
  res.send('API SmartFlow funcionando 🚀');
});

// 🔹 Rutas de clientes

// 🔹 Puerto
const PORT = process.env.PORT || 3000;

// 🔹 Levantar servidor
app.listen(PORT, () => {
  console.log(`SERVIDOR ACTIVO EN PUERTO ${PORT}`);
});