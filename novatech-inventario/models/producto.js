// models/producto.js
// Capa de acceso a datos. Usa un archivo JSON como "base de datos" simple
// para que el proyecto corra sin instalar motores externos.

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "productos.json");

function leerProductos() {
  const contenido = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(contenido || "[]");
}

function guardarProductos(productos) {
  fs.writeFileSync(DB_PATH, JSON.stringify(productos, null, 2), "utf-8");
}

function generarId(productos) {
  return productos.length > 0
    ? Math.max(...productos.map((p) => p.id)) + 1
    : 1;
}

module.exports = {
  leerProductos,
  guardarProductos,
  generarId,
};
