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
  // BUG intencional: esto solo calcula el monto del impuesto, no el precio total.
  // Lo vamos a corregir más adelante en el hotfix 1.0.1
  return precio * 0.16;
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
            <td><button class="edit" onclick="prepararEdicion(${p.id})">Editar</button></td>
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
