require('dotenv').config();
const app = require('./app');
const db = require('./db');
const port = Number(process.env.PORT || 3000);
(async () => {
  try {
    const connection = await db.getConnection();
    await connection.ping();
    connection.release();
    app.listen(port, () => console.log(`Noble Society API disponible en http://localhost:${port}`));
  } catch (error) {
    console.error('No se pudo conectar con MySQL. Verifique .env y ejecute database/schema.sql.', error.message);
    process.exit(1);
  }
})();
