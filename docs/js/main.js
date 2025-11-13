const u=document.querySelector(".js-search-input"),m=document.querySelector(".js-search-btn"),o=document.querySelector(".js-results-list"),a=document.querySelector(".js-shopping-list");let n=[],c=[];const p=localStorage.getItem("shoppingCartProducts");p&&(c=JSON.parse(p));function d(t){if(o.innerHTML="",t.length===0){o.innerHTML=`
      <div class="no-results">
        <p>Lo sentimos, ningún producto coincide con los términos de tu búsqueda.</p>
        <p>Haz clic en el botón y prueba con otras palabras clave.</p>
      </div>
    `;return}for(let e=0;e<t.length;e++){const s=t[e];o.innerHTML+=`
      <li class="result">
        <div class="product-card" data-id="${s.id}">
          <img src="${s.image}" alt="${s.title}">
          <h3>${s.title}</h3>
          <span class="js-price-card">${s.price} €</span>
          <button type="button" class="addProduct js-add-product" data-id="${s.id}">Comprar</button>
        </div>
      </li>
    `}}function f(){const t=u.value.toLowerCase().trim();if(t===""){d(n);return}const e=n.filter(s=>s.title.toLowerCase().includes(t));d(e),u.value=""}function g(t){return t.classList.contains("clicked")?(t.classList.remove("clicked"),t.textContent="Comprar",!1):(t.classList.add("clicked"),t.textContent="Eliminar",!0)}function h(t,e){if(e){const s=n.find(r=>r.id===t);c.push(s)}else c=c.filter(s=>s.id!==t);localStorage.setItem("shoppingCartProducts",JSON.stringify(c)),l()}function l(){if(a.innerHTML="",c.length===0){a.innerHTML="<p>Tu carrito está vacío</p>";return}for(let t=0;t<c.length;t++){const e=c[t];a.innerHTML+=`
      <div class="cart-item">
        <img src="${e.image}" alt="${e.title}">
        <div class="cart-item-info">
          <h4>${e.title}</h4>
          <span class="cart-price">${e.price} €</span>
        </div>
        <button type="button" class="remove-item" data-id="${e.id}">X</button>
      </div>
    `}}o.addEventListener("click",t=>{const e=t.target;if(e.classList.contains("addProduct")){const s=Number(e.dataset.id),r=g(e);h(s,r);const i=e.closest(".product-card");r?i.classList.add("selected"):i.classList.remove("selected")}});a.addEventListener("click",t=>{const e=t.target;if(e.classList.contains("remove-item")){const s=Number(e.dataset.id);c=c.filter(i=>i.id!==s),localStorage.setItem("shoppingCartProducts",JSON.stringify(c)),l();const r=document.querySelector(`.addProduct[data-id="${s}"]`);if(r){r.classList.remove("clicked"),r.textContent="Comprar";const i=r.closest(".product-card");i&&i.classList.remove("selected")}}});m.addEventListener("click",f);fetch("https://fakestoreapi.com/products").then(t=>t.json()).then(t=>{n=t,d(n),l()}).catch(t=>console.error("Error:",t));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
