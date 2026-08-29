// public/app.js
// Lógica del frontend. Al igual que routes/productos.js,
// las funciones de cada operación se agregan progresivamente
// en su rama feature/* correspondiente.

const API_URL = "/api/productos";

const form = document.getElementById("form-producto");
const tbody = document.querySelector("#tabla-productos tbody");

// Las funciones cargarProductos(), crearProducto(), editarProducto()
// y eliminarProducto() se implementan una por una durante la Fase 3.
