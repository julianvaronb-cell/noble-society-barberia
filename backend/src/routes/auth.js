
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { correo, password } = req.body;

    if (
      typeof correo !== 'string' ||
      typeof password !== 'string' ||
      !correo.trim() ||
      !password
    ) {
      return res.status(400).json({
        error: 'Correo y contraseña son obligatorios'
      });
    }

    const [usuarios] = await pool.execute(
      'SELECT id, nombre, correo, password_hash, rol FROM usuario WHERE correo = ?',
      [correo.trim().toLowerCase()]
    );

    const usuario = usuarios[0];

    if (!usuario) {
      return res.status(401).json({
        error: 'Credenciales incorrectas'
      });
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password_hash
    );

    if (!passwordValida) {
      return res.status(401).json({
        error: 'Credenciales incorrectas'
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET no está configurado');
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h', algorithm: 'HS256' }
    );

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

