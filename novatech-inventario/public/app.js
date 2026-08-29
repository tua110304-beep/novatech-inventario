// public/app.js
const API_URL = "/api/productos";

const form = document.getElementById("form-producto");
const tbody = document.querySelector("#tabla-productos tbody");

async function crearProducto(producto) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const producto = {
    nombre: document.getElementById("nombre").value,
    precio: document.getElementById("precio").value,
    categoria: document.getElementById("categoria").value,
    stock: document.getElementById("stock").value,
  };
  await crearProducto(producto);
  form.reset();
});