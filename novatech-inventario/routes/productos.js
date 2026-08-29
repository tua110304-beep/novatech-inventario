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
// GET /api/productos - listar productos
router.get("/", (req, res) => {
  const productos = leerProductos();
  res.json(productos);
});
// PUT /api/productos/:id - editar un producto
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const productos = leerProductos();
  const idx = productos.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: "Producto no encontrado" });

  const { nombre, precio, categoria, stock } = req.body;
  productos[idx] = {
    ...productos[idx],
    nombre: nombre ?? productos[idx].nombre,
    precio: precio != null ? Number(precio) : productos[idx].precio,
    categoria: categoria ?? productos[idx].categoria,
    stock: stock != null ? Number(stock) : productos[idx].stock,
  };
  guardarProductos(productos);
  res.json(productos[idx]);
});
module.exports = router;