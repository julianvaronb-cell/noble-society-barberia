-- Esquema inicial para ejecutar la API de Noble Society.
-- Revise los nombres y relaciones frente al modelo MySQL Workbench existente antes de usarlo en producción.
CREATE DATABASE IF NOT EXISTS noble_society CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE noble_society;

CREATE TABLE IF NOT EXISTS cliente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  telefono VARCHAR(30),
  correo VARCHAR(150),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS servicio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  descripcion VARCHAR(255),
  precio DECIMAL(10,2) NOT NULL DEFAULT 0,
  duracion_minutos INT DEFAULT 30,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS inventario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  cantidad INT NOT NULL DEFAULT 0,
  precio_unitario DECIMAL(10,2) DEFAULT 0,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS cita (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  servicio_id INT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  estado ENUM('programada','confirmada','atendida','cancelada') NOT NULL DEFAULT 'programada',
  observaciones VARCHAR(500),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cita_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id),
  CONSTRAINT fk_cita_servicio FOREIGN KEY (servicio_id) REFERENCES servicio(id),
  INDEX idx_cita_fecha_hora (fecha, hora)
);
