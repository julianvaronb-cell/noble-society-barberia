const express = require('express');
const crudRouter = require('./crudFactory');
const router = express.Router();
router.use('/clientes', crudRouter({ table: 'cliente', fields: ['nombre', 'telefono', 'correo'], required: ['nombre'] }));
router.use('/servicios', crudRouter({ table: 'servicio', fields: ['nombre', 'descripcion', 'precio', 'duracion_minutos'], required: ['nombre', 'precio'] }));
router.use('/citas', crudRouter({ table: 'cita', fields: ['cliente_id', 'servicio_id', 'fecha', 'hora', 'estado', 'observaciones'], required: ['cliente_id', 'servicio_id', 'fecha', 'hora'] }));
router.use('/inventario', crudRouter({ table: 'inventario', fields: ['nombre', 'cantidad', 'precio_unitario'], required: ['nombre', 'cantidad'] }));
module.exports = router;
