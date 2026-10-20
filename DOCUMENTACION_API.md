# Documentación de servicios web — Noble Society

**Proyecto:** aplicación web administrativa y operativa para la barbería Noble Society.  
**Tecnología propuesta:** Node.js, Express y MySQL.  
**Versión:** 1.0.0  
**URL local:** `http://localhost:3000`

## 1. Descripción
La API REST expone servicios para consultar, crear, modificar y eliminar clientes, servicios de barbería, citas e inventario. Los datos se intercambian en formato JSON y se almacenan en MySQL.

## 2. Endpoints
Cada recurso admite:

| Método | Ruta | Descripción | Respuesta esperada |
|---|---|---|---|
| GET | `/api/{recurso}` | Lista registros | `200 OK` |
| GET | `/api/{recurso}/:id` | Consulta un registro | `200 OK` o `404 Not Found` |
| POST | `/api/{recurso}` | Crea un registro | `201 Created` o `400 Bad Request` |
| PUT | `/api/{recurso}/:id` | Actualiza un registro | `200 OK`, `400` o `404` |
| DELETE | `/api/{recurso}/:id` | Elimina un registro | `200 OK` o `404 Not Found` |

Recursos válidos: `clientes`, `servicios`, `citas`, `inventario`.

## 3. Campos de cada recurso
- **Clientes:** `nombre` (obligatorio), `telefono`, `correo`.
- **Servicios:** `nombre` y `precio` (obligatorios), `descripcion`, `duracion_minutos`.
- **Citas:** `cliente_id`, `servicio_id`, `fecha` (AAAA-MM-DD) y `hora` (HH:MM:SS) obligatorios; también `estado` y `observaciones`.
- **Inventario:** `nombre` y `cantidad` obligatorios; también `precio_unitario`.

## 4. Ejemplos
### Crear cliente
`POST http://localhost:3000/api/clientes`
```json
{ "nombre": "Carlos Pérez", "telefono": "3001234567", "correo": "carlos@example.com" }
```
Respuesta típica `201`:
```json
{ "mensaje": "Registro creado correctamente", "data": { "id": 1, "nombre": "Carlos Pérez", "telefono": "3001234567", "correo": "carlos@example.com" } }
```

### Crear servicio
`POST /api/servicios`
```json
{ "nombre": "Corte clásico", "descripcion": "Corte tradicional", "precio": 25000, "duracion_minutos": 30 }
```

### Crear cita
`POST /api/citas` (cliente y servicio deben existir)
```json
{ "cliente_id": 1, "servicio_id": 1, "fecha": "2026-11-01", "hora": "10:00:00", "estado": "programada" }
```

### Listar inventario
`GET /api/inventario`

## 5. Códigos de estado
- `200`: operación completada.
- `201`: registro creado.
- `400`: datos obligatorios faltantes o referencia inválida.
- `404`: ruta o registro inexistente.
- `409`: conflicto por duplicación.
- `500`: error inesperado del servidor.

## 6. Prueba de disponibilidad
Abra `http://localhost:3000/` y luego `http://localhost:3000/api-docs`. Para probar creación y actualización use Postman, Insomnia o `curl`.

## 7. Nota de integración
El front-end original contiene formularios que muestran alertas y no persisten los datos. La API se entrega como backend inicial separado; para que el formulario guarde realmente información, hay que cambiar su JavaScript para enviar solicitudes `fetch()` a estos endpoints. El esquema SQL incluido es un esquema inicial funcional y debe compararse con el modelo MySQL Workbench del equipo antes de sustituir la base de datos existente.
