# Documentación de servicios web – Noble Society

**Evidencia:** GA7-220501096-AA5-EV03

**Programa:** Tecnólogo en Análisis y Desarrollo de Software (ADSO)

**Proyecto:** Noble Society

**Integrantes:**
- Julián Varón
- Karen Colmenares
- David Echeverría
- Deisi Paola Durán

## 1. Descripción del proyecto

Para esta evidencia trabajamos en el desarrollo de los servicios web de nuestro proyecto Noble Society, que es una aplicación para administrar una barbería.

Utilizamos Node.js, Express y MySQL para crear una API que nos permite guardar, consultar, modificar y eliminar información desde las diferentes páginas del proyecto.

También utilizamos Git y GitHub para guardar los cambios que fuimos realizando durante el desarrollo.

## 2. Servicios web desarrollados

Nuestra API cuenta con cuatro módulos principales: clientes, servicios, citas e inventario. Cada uno permite realizar las siguientes operaciones:

| Método | Función |
|---|---|
| GET | Consultar todos los registros |
| GET /:id | Consultar un registro específico |
| POST | Registrar información nueva |
| PUT /:id | Modificar un registro |
| DELETE /:id | Eliminar un registro |

La dirección principal de nuestra API es:

`http://localhost:3000/api`

## 3. Servicio de clientes

**Ruta:** `/api/clientes`

Este servicio nos permite registrar y administrar los clientes de la barbería.

Los datos que utilizamos son nombre, teléfono y correo. El nombre es obligatorio.

Ejemplo para registrar un cliente:

**POST** `/api/clientes`

```json
{
  "nombre": "Carlos Perez",
  "telefono": "3001234567",
  "correo": "carlos@ejemplo.com"
}
```

## 4. Servicio de barbería

**Ruta:** `/api/servicios`

Este servicio permite registrar los servicios que ofrece la barbería, incluyendo su nombre, descripción, precio y duración.

El nombre y el precio son obligatorios.

Ejemplo:

**POST** `/api/servicios`

```json
{
  "nombre": "Corte clasico",
  "descripcion": "Corte de cabello tradicional",
  "precio": 25000,
  "duracion_minutos": 30
}
```

## 5. Servicio de citas

**Ruta:** `/api/citas`

Este servicio nos permite administrar las citas de los clientes, indicando el servicio solicitado, la fecha, la hora y su estado.

Ejemplo:

**POST** `/api/citas`

```json
{
  "cliente_id": 1,
  "servicio_id": 1,
  "fecha": "2026-11-01",
  "hora": "10:00:00",
  "estado": "programada",
  "observaciones": "Corte de cabello"
}
```

Para registrar una cita, el cliente y el servicio deben existir previamente.

## 6. Servicio de inventario

**Ruta:** `/api/inventario`

Este servicio nos permite llevar el control de los productos que tiene la barbería, sus cantidades y precios.

El nombre y la cantidad son obligatorios.

Ejemplo:

**POST** `/api/inventario`

```json
{
  "nombre": "Gel para cabello",
  "cantidad": 10,
  "precio_unitario": 15000
}
```

## 7. Inicio de sesión

**Ruta:** `POST /api/auth/login`

También desarrollamos un servicio para iniciar sesión en Noble Society.

Este recibe el correo y la contraseña del usuario y comprueba que sean correctos.

Ejemplo:

```json
{
  "correo": "usuario@ejemplo.com",
  "password": "clave_de_prueba"
}
```

Si los datos son correctos, el servidor responde con un mensaje de inicio de sesión exitoso, un token y la información del usuario.

Si son incorrectos, devuelve un error 401.

Para proteger las contraseñas utilizamos bcryptjs y para generar el token de acceso utilizamos JWT.

## 8. Respuestas de la API

Durante el desarrollo utilizamos diferentes códigos de respuesta:

- **200:** la operación se realizó correctamente.
- **201:** se creó un registro.
- **400:** faltan datos obligatorios o hay una referencia inválida.
- **401:** correo o contraseña incorrectos.
- **404:** no se encontró el registro o la ruta.
- **409:** existe un registro duplicado.
- **500:** ocurrió un error interno del servidor.

## 9. Integración con el frontend

Conectamos las páginas de Noble Society con los servicios de nuestra API utilizando JavaScript y solicitudes `fetch()`.

De esta manera podemos registrar, consultar, modificar y eliminar información de clientes, citas, servicios e inventario.

Los datos se almacenan en MySQL y se muestran en las diferentes páginas del proyecto.

También implementamos el inicio de sesión para acceder al panel principal.

## 10. Cómo ejecutar el proyecto

Primero debemos tener configurada la base de datos MySQL.

Después abrimos una terminal en la carpeta `backend` y ejecutamos:

`npm run dev`

Cuando el servidor esté funcionando, podemos consultar estas direcciones:

**API activa:** http://localhost:3000/

**Documentación de rutas:** http://localhost:3000/api-docs

Para utilizar el frontend, abrimos otra terminal dentro de la carpeta `frontend` y ejecutamos:

`py -m http.server 5500`

Luego ingresamos a:

http://localhost:5500/index.html

## 11. Repositorio de GitHub

https://github.com/julianvaronb-cell/noble-society-barberia

En este repositorio guardamos los archivos del proyecto y los cambios realizados durante su desarrollo.

## 12. Conclusión

Con esta actividad pudimos poner en práctica lo aprendido sobre la creación de servicios web y su conexión con una base de datos.

Como equipo logramos desarrollar una API que permite administrar la información de Noble Society y conectarla con las páginas de nuestro proyecto.

También aprendimos a organizar mejor nuestro código y a utilizar Git y GitHub para llevar un control de los cambios.