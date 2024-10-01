let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para añadir productos al carrito
function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(p => p.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push(product);
    }

    // Guardar carrito en localStorage para que persista entre recargas
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la visualización del carrito (si tienes un contador o algo similar)
    updateCartSummary();
}

// Actualizar el resumen del carrito
function updateCartSummary() {
    const cartCount = cart.reduce((sum, product) => sum + product.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

// Inicializar el resumen del carrito al cargar la página
updateCartSummary();
