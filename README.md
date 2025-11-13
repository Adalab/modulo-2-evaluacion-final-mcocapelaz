# Tu tienda de caprichos online

Este ejercicio final consiste en una tienda online creada con HTML, SCSS y JavaScript. Permite buscar productos, añadirlos al carrito y gestionar las compras con almacenamiento local.

Enlace de GitHub Pages: https://beta.adalab.es/modulo-2-evaluacion-final-mcocapelaz/

## Características

- **Catálogo de productos** - Carga dinámica desde API REST
- **Buscador en tiempo real** - Filtra productos por nombre
- **Carrito de compras** - Añade y elimina productos
- **Persistencia de datos** - El carrito se guarda en localStorage
- **Diseño responsive** - Mobile-first design y adaptación a desktop
- **Interfaz visual** - Feedback visual al añadir productos
- **Sin dependencias** - JavaScript vanilla puro

## Demo

La aplicación muestra productos de [Fake Store API](https://fakestoreapi.com/products) con imágenes reales y precios.

## Instalación

1. **Clona o descarga el proyecto**

2. **Estructura del proyecto:**
   ```
   proyecto/
   ├── index.html
   ├── js/
   │   └── main.js
   ├── scss/
   │   └── main.scss
   └── css/
       └── main.css (generado automáticamente)
   ```   ```

3. **Abre el proyecto:**
   - Haz clic derecho en `index.html`
   - Selecciona "Open with Live Server"
   - O simplemente abre `index.html` en tu navegador

## Uso

### Buscar Productos
1. Escribe el nombre del producto en el buscador
2. Haz clic en "Buscar"
3. Los resultados se filtrarán automáticamente

### Añadir al Carrito
1. Recorre el catálogo de productos
2. Haz clic en el botón "Comprar" del producto deseado
3. El producto se añadirá al carrito (en el lateral izquierdo)
4. La tarjeta del producto seleccionado cambiará de color
5. El botón "Comprar" cambiará de color y mostrará "Eliminar"

### Eliminar del Carrito
1. En el carrito, haz clic en el botón "X" del producto
2. El producto se eliminará del carrito
3. El botón volverá a su color original y mostrará "Comprar"

### Funcionalidades Técnicas:
* LocalStorage: Los productos del carrito se guardan automáticamente en el navegador. Permanecen aunque se cierre la página.
* Event Delegation: Se usa delegación de eventos para manejar clicks en elementos dinámicos (productos generados por JavaScript).

###  Licencia: Este proyecto es de código abierto y está disponible para uso educativo.
###  Autora: Mónica Coca- promo 58 (Adalab). 


