"use strict";

// SECCIÓN DE QUERY-SELECTOR
// Éstos son los elementos que nos traemos de la página HTML y usamos en el código

const searchInput = document.querySelector(".js-search-input");
const searchButton = document.querySelector(".js-search-btn");
const addButton = document.querySelector(".js-add-product");
const resultList = document.querySelector(".js-results-list");

// SECCIÓN DE DATOS
// Variables globales que almacenan la información principal de la aplicación
// y se usan por todo el fichero.

let products = [];
let shoppingCartProducts = [];

// SECCIÓN DE FUNCIONES

function displayProducts(listToShow) {
  resultList.innerHTML = "";

  if (listToShow.length === 0) {
    resultList.innerHTML = `
      <div class="no-results">
        <p>Lo sentimos, ningún producto coincide con los términos de tu búsqueda.</p>
        <p>Prueba con otras palabras clave.</p>
      </div>
    `;
    return;
  }

  for (let i = 0; i < listToShow.length; i++) {
    const item = listToShow[i];
    resultList.innerHTML += `<li class="result">
<div class="product-card" data-id="${item.id}">
<img src= "${item.image}" alt="${item.title}">
<h3>"${item.title}"</h3>
<span class="js-price-card">${item.price} €</span>
<button class="addProduct js-add-product" data-id="${item.id}">Comprar</button>
</li>
</div>
  </li>
    `;
  }
}

function searchProducts() {
  const searchValue = searchInput.value.toLowerCase().trim();
  if (searchValue === "") {
    displayProducts(products);
    return;
  }
  const filteredProducts = products.filter((item) => {
    return item.title.toLowerCase().includes(searchValue);
  });

  displayProducts(filteredProducts);
  searchInput.value = "";
}

// function shoppingProducts(){
//   const shoppingItem = ev.currentTarget;

// }

// Éstas son funciones:
//   - con código auxiliar
//   - con código que usaremos en los eventos
//   - para pintar (render) en la página.

// SECCIÓN DE FUNCIONES DE EVENTOS
// Aquí van las funciones handler/manejadoras de eventos

// SECCIÓN DE EVENTOS
// Éstos son los eventos a los que reacciona la página
// Los más comunes son: click (en botones, enlaces), input (en ídem) y submit (en form)

searchButton.addEventListener("click", searchProducts);

resultList.addEventListener("click", (ev) => {
  const clickedItem = ev.target;

  if (clickedItem.classList.contains("addProduct")) {
    clickedItem.classList.toggle("clicked");
    const productId = Number(clickedItem.dataset.id);
    const findNumber = products.find((item) => {
      return item.id === productId;
    });

    shoppingCartProducts.push(findNumber);

    displayShoppingCart();
  }
});

// SECCIÓN DE ACCIONES AL CARGAR LA PÁGINA
// Este código se ejecutará cuando se carga la página
// Lo más común es:
//   - Pedir datos al servidor
//   - Pintar (render) elementos en la página

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    displayProducts(products);
  })

  .catch((error) => console.error("Error:", error));
