// server.js
// NovaTech Solutions - Sistema de Inventario
// Estructura base del proyecto (Fase 1 - Git Flow)

const express = require("express");
const path = require("path");
const productosRoutes = require("./routes/productos");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Todas las rutas de la API de productos viven en routes/productos.js
// Cada endpoint se irá agregando en su propia rama feature/*
app.use("/api/productos", productosRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", empresa: "NovaTech Solutions" });
});

app.listen(PORT, () => {
  console.log(`NovaTech Inventario corriendo en http://localhost:${PORT}`);
});
