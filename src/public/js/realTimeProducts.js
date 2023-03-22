const socket = io();

const productList = document.getElementById("productsList");
const deleteProductForm = document.getElementById("deleteProductForm");

deleteProductForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const productId = document.getElementById("pid").value;
  fetch(`/api/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
});



socket.on("products", (products) => {
  let showProducts = "";
  products.forEach((prod) => {
    showProducts += `Producto ${prod.id}: ${prod.title }  <br/>  Marca: ${prod.description};  Precio: $${prod.price};  Codigo: ${prod.code}; Cantidad:${prod.stock}</br> `;
  });
  productList.innerHTML = `${showProducts}`;
});