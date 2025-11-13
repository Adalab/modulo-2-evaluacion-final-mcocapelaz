"use strict";

// QUERY SELECTORS
const searchInput = document.querySelector(".js-search-input");
const searchButton = document.querySelector(".js-search-btn");
const resultList = document.querySelector(".js-results-list");
const shoppingList = document.querySelector(".js-shopping-list");

// DATOS
let products = [];
let shoppingCartProducts = [];

const savedShoppingCart = localStorage.getItem("shoppingCartProducts");
if (savedShoppingCart) {
  shoppingCartProducts = JSON.parse(savedShoppingCart);
}

// FUNCIONES
function displayProducts(listToShow) {
  resultList.innerHTML = "";

  if (listToShow.length === 0) {
    resultList.innerHTML = `
      <div class="no-results">
        <p>Lo sentimos, ningún producto coincide con los términos de tu búsqueda.</p>
        <p>Haz clic en el botón y prueba con otras palabras clave.</p>
      </div>
    `;
    return;
  }

  for (let i = 0; i < listToShow.length; i++) {
    const item = listToShow[i];
    resultList.innerHTML += `
      <li class="result">
        <div class="product-card" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}">
          <h3>${item.title}</h3>
          <span class="js-price-card">${item.price} €</span>
          <button type="button" class="addProduct js-add-product" data-id="${item.id}">Comprar</button>
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

function toggleBtn(button) {
  if (button.classList.contains("clicked")) {
    button.classList.remove("clicked");
    button.textContent = "Comprar";
    return false;
  } else {
    button.classList.add("clicked");
    button.textContent = "Eliminar";
    return true;
  }
}

function updateShoppingCart(productId, shouldAddItem) {
  if (shouldAddItem) {
    const foundItem = products.find((item) => {
      return item.id === productId;
    });
    shoppingCartProducts.push(foundItem);
  } else {
    shoppingCartProducts = shoppingCartProducts.filter((item) => {
      return item.id !== productId;
    });
  }

  localStorage.setItem(
    "shoppingCartProducts",
    JSON.stringify(shoppingCartProducts)
  );
  shoppingProducts();
}

function shoppingProducts() {
  shoppingList.innerHTML = "";

  if (shoppingCartProducts.length === 0) {
    shoppingList.innerHTML = "<p>Tu carrito está vacío</p>";
    return;
  }

  for (let i = 0; i < shoppingCartProducts.length; i++) {
    const item = shoppingCartProducts[i];
    shoppingList.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <h4>${item.title}</h4>
          <span class="cart-price">${item.price} €</span>
        </div>
        <button type="button" class="remove-item" data-id="${item.id}">X</button>
      </div>
    `;
  }
}

// EVENTOS

resultList.addEventListener("click", (ev) => {
  const clickedItem = ev.target;
  if (clickedItem.classList.contains("addProduct")) {
    const productId = Number(clickedItem.dataset.id);
    const shouldAddItem = toggleBtn(clickedItem);
    updateShoppingCart(productId, shouldAddItem);

    const productCard = clickedItem.closest(".product-card");
    if (shouldAddItem) {
      productCard.classList.add("selected");
    } else {
      productCard.classList.remove("selected");
    }
  }
});

shoppingList.addEventListener("click", (ev) => {
  const clickedItem = ev.target;
  if (clickedItem.classList.contains("remove-item")) {
    const productId = Number(clickedItem.dataset.id);

    shoppingCartProducts = shoppingCartProducts.filter((item) => {
      return item.id !== productId;
    });

    localStorage.setItem(
      "shoppingCartProducts",
      JSON.stringify(shoppingCartProducts)
    );
    shoppingProducts();

    const shoppingBtn = document.querySelector(
      `.addProduct[data-id="${productId}"]`
    );
    if (shoppingBtn) {
      shoppingBtn.classList.remove("clicked");
      shoppingBtn.textContent = "Comprar";

      const productCard = shoppingBtn.closest(".product-card");
      if (productCard) {
        productCard.classList.remove("selected");
      }
    }
  }
});

searchButton.addEventListener("click", searchProducts);

// CÓDIGO AL CARGAR LA PÁGINA
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    displayProducts(products);
    shoppingProducts();
  })
  .catch((error) => console.error("Error:", error));
