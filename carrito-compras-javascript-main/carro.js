let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPriceElement = document.getElementById("total-price");

// Mostrar/ocultar carrito
cartIcon.addEventListener("mouseenter", () => {
    cartSidebar.classList.add("open");
});

cartSidebar.addEventListener("mouseleave", () => {
    cartSidebar.classList.remove("open");
});

// Agregar producto al carrito
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const product = this.closest('.product');
        const productId = product.getAttribute("data-id");
        const productName = product.getAttribute("data-name");
        const productPrice = parseFloat(product.getAttribute("data-price"));
        const productImg = product.querySelector('img').src;

        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1,
                img: productImg
            });
        }
        animateCartAddition();
        updateCart();
    });
});

// Animación al agregar producto
function animateCartAddition() {
    cartIcon.style.transform = "scale(1.2)";
    setTimeout(() => {
        cartIcon.style.transform = "scale(1)";
    }, 300);
}

// Actualizar contenido del carrito
function updateCart() {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotalPrice = (item.price * item.quantity).toFixed(2);
        totalPrice += parseFloat(itemTotalPrice);

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                <p>Subtotal: $${itemTotalPrice}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">🗑️</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartCount.textContent = cart.length;
    totalPriceElement.textContent = totalPrice.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Remover productos
cartItemsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-item")) {
        const productId = e.target.getAttribute("data-id");
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
});

// Inicializar carrito
updateCart();
