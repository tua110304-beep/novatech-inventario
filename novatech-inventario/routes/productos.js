// routes/productos.js
const express = require("express");
const router = express.Router();
const { leerProductos, guardarProductos, generarId } = require("../models/producto");

// POST /api/productos - crear un producto
router.post("/", (req, res) => {
  const { nombre, precio, categoria, stock } = req.body;
  if (!nombre || precio == null || !categoria || stock == null) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }
  const productos = leerProductos();
  const nuevoProducto = {
    id: generarId(productos),
    nombre,
    precio: Number(precio),
    categoria,
    stock: Number(stock),
  };
  productos.push(nuevoProducto);
  guardarProductos(productos);
  res.status(201).json(nuevoProducto);
});

module.exports = router;