const express = require('express');
const db = require('../db');
const asyncHandler = require('../middleware/asyncHandler');

// Los nombres de tabla y columnas se definen en schema.sql.
function crudRouter({ table, fields, required = [] }) {
  const router = express.Router();
  const allowed = new Set(fields);
  const selectFields = ['id', ...fields].map((f) => `\`${f}\``).join(', ');

  router.get('/', asyncHandler(async (_req, res) => {
    const [rows] = await db.query(`SELECT ${selectFields} FROM \`${table}\` ORDER BY id DESC`);
    res.json({ data: rows, total: rows.length });
  }));

  router.get('/:id', asyncHandler(async (req, res) => {
    const [rows] = await db.execute(`SELECT ${selectFields} FROM \`${table}\` WHERE id = ?`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json({ data: rows[0] });
  }));

  router.post('/', asyncHandler(async (req, res) => {
    const body = req.body || {};
    const missing = required.filter((field) => body[field] === undefined || body[field] === null || body[field] === '');
    if (missing.length) return res.status(400).json({ error: 'Faltan campos obligatorios', campos: missing });
    const keys = Object.keys(body).filter((key) => allowed.has(key));
    if (!keys.length) return res.status(400).json({ error: 'Envíe al menos un campo permitido' });
    const columns = keys.map((k) => `\`${k}\``).join(', ');
    const placeholders = keys.map(() => '?').join(', ');
    const values = keys.map((k) => body[k]);
    const [result] = await db.execute(`INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`, values);
    const [rows] = await db.execute(`SELECT ${selectFields} FROM \`${table}\` WHERE id = ?`, [result.insertId]);
    res.status(201).json({ mensaje: 'Registro creado correctamente', data: rows[0] });
  }));

  router.put('/:id', asyncHandler(async (req, res) => {
    const keys = Object.keys(req.body || {}).filter((key) => allowed.has(key));
    if (!keys.length) return res.status(400).json({ error: 'Envíe campos válidos para actualizar' });
    const assignments = keys.map((k) => `\`${k}\` = ?`).join(', ');
    const values = keys.map((k) => req.body[k]);
    values.push(req.params.id);
    const [result] = await db.execute(`UPDATE \`${table}\` SET ${assignments} WHERE id = ?`, values);
    if (!result.affectedRows) return res.status(404).json({ error: 'Registro no encontrado' });
    const [rows] = await db.execute(`SELECT ${selectFields} FROM \`${table}\` WHERE id = ?`, [req.params.id]);
    res.json({ mensaje: 'Registro actualizado correctamente', data: rows[0] });
  }));

  router.delete('/:id', asyncHandler(async (req, res) => {
    const [result] = await db.execute(`DELETE FROM \`${table}\` WHERE id = ?`, [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json({ mensaje: 'Registro eliminado correctamente' });
  }));
  return router;
}
module.exports = crudRouter;
