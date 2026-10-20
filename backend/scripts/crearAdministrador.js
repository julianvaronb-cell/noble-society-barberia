const pool = require('../src/db');
const bcrypt = require('bcryptjs');
const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

async function crearAdministrador() {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout
  });

  try {
    const nombre = (await rl.question('Nombre del administrador: ')).trim();
    const correo = (await rl.question('Correo electrónico: ')).trim().toLowerCase();
    const password = await rl.question('Contraseña (mínimo 12 caracteres): ');

    if (!nombre || !correo || password.length < 12) {
      throw new Error('Completa todos los campos y utiliza una contraseña de al menos 12 caracteres.');
    }

    const [existentes] = await pool.execute(
      'SELECT id FROM usuario WHERE correo = ?',
      [correo]
    );

    if (existentes.length > 0) {
      throw new Error('Ya existe un usuario con ese correo.');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await pool.execute(
      'INSERT INTO usuario (nombre, correo, password_hash, rol) VALUES (?, ?, ?, ?)',
      [nombre, correo, passwordHash, 'administrador']
    );

    console.log('Administrador creado correctamente.');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
    await pool.end();
  }
}

crearAdministrador();
