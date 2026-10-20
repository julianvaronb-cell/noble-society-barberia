# Noble Society — Evidencia GA7-220501096-AA5-EV03

Backend inicial de servicios web REST para la aplicación de barbería Noble Society, junto con el front-end entregado previamente.

## Requisitos
- Node.js 18 o superior
- MySQL 8 o compatible
- Git (para versionamiento)

## Instalación local
1. Abra MySQL Workbench y ejecute `backend/database/schema.sql` para crear el esquema de ejemplo `noble_society`.
2. Abra una terminal dentro de `backend` y ejecute `npm install`.
3. Copie `.env.example` como `.env` y ajuste usuario, contraseña y base de datos de MySQL.
4. Ejecute `npm start`.
5. Abra `http://localhost:3000/` y `http://localhost:3000/api-docs`.
6. Pruebe endpoints con Postman/Insomnia. Ejemplo: `GET http://localhost:3000/api/clientes`.

## Versionamiento con Git
Desde la carpeta raíz del proyecto:
```bash
git init
git add .
git commit -m "Entrega inicial API Noble Society"
```
Después cree un repositorio vacío en GitHub y siga las instrucciones que GitHub muestra para enlazarlo:
```bash
git branch -M main
git remote add origin URL_DE_TU_REPOSITORIO
git push -u origin main
```
Guarde la URL real en `ENLACE_REPOSITORIO.txt`.

## Importante
Este paquete es una primera versión de trabajo, no una prueba de que el backend se haya ejecutado en el computador del aprendiz. Debe configurar MySQL, probar los endpoints y verificar el esquema existente antes de la entrega final. No suba el archivo `.env` ni contraseñas a GitHub.
