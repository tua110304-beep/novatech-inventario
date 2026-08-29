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
  if (idEnEdicion) {
    await editarProducto(idEnEdicion, producto);
    idEnEdicion = null;
  } else {
    await crearProducto(producto);
  }
  form.reset();
  cargarProductos();
});
function calcularPrecioConIVA(precio) {
  // Corregido: ahora se suma el IVA (16%) al precio base
  return precio * 1.16;
}

async function cargarProductos() {
  const res = await fetch(API_URL);
  const productos = await res.json();
  tbody.innerHTML = "";
  productos.forEach((p) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>$${p.precio.toFixed(2)} (IVA: $${calcularPrecioConIVA(p.precio).toFixed(2)})</td>
      <td>${p.categoria}</td>
      <td>${p.stock}</td>
        <td>
        <button class="edit" onclick="prepararEdicion(${p.id})">Editar</button>
        <button class="danger" onclick="eliminarProducto(${p.id})">Eliminar</button>
      </td>
      
    `;
    tbody.appendChild(tr);
  });
}

cargarProductos();

let idEnEdicion = null;

async function prepararEdicion(id) {
  const res = await fetch(API_URL);
  const productos = await res.json();
  const p = productos.find((x) => x.id === id);
  document.getElementById("nombre").value = p.nombre;
  document.getElementById("precio").value = p.precio;
  document.getElementById("categoria").value = p.categoria;
  document.getElementById("stock").value = p.stock;
  idEnEdicion = id;
}

async function editarProducto(id, producto) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  
}
async function eliminarProducto(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  cargarProductos();
}