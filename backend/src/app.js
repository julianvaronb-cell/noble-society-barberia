const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (_req, res) => res.json({ proyecto: 'Noble Society', mensaje: 'API REST activa', version: '1.0.0', documentacion: '/api-docs' }));
app.get('/api-docs', (_req, res) => res.json({
  titulo: 'Noble Society API', version: '1.0.0', baseUrl: '/api',
  recursos: {
    clientes: 'GET/POST /api/clientes; GET/PUT/DELETE /api/clientes/:id',
    servicios: 'GET/POST /api/servicios; GET/PUT/DELETE /api/servicios/:id',
    citas: 'GET/POST /api/citas; GET/PUT/DELETE /api/citas/:id',
    inventario: 'GET/POST /api/inventario; GET/PUT/DELETE /api/inventario/:id'
  }
}));
app.use('/api', routes);
app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'El registro ya existe' });
  if (err.code === 'ER_NO_REFERENCED_ROW_2') return res.status(400).json({ error: 'La referencia a cliente o servicio no existe' });
  res.status(500).json({ error: 'Error interno del servidor' });
});
module.exports = app;
