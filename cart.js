document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");
    const clearCartButton = document.getElementById("clearCart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item, index) => {
                totalPrice += item.price * item.quantity;

                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>₹${item.price.toFixed(2)}</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease" data-index="${index}">−</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn increase" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-index="${index}">❌</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        cartTotalElement.textContent = totalPrice.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    cartItemsContainer.addEventListener("click", (event) => {
        const index = event.target.dataset.index;

        if (event.target.classList.contains("increase")) {
            cart[index].quantity++;
        } else if (event.target.classList.contains("decrease")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        } else if (event.target.classList.contains("remove-item")) {
            cart.splice(index, 1);
        }

        updateCartDisplay();
    });

    clearCartButton.addEventListener("click", () => {
        cart = [];
        updateCartDisplay();
    });

    updateCartDisplay();
});
document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let item = this.parentElement;
            let itemName = item.querySelector("h3").textContent;
            let itemPrice = item.querySelector("p").textContent.replace("₹", "").trim();
            let itemImage = item.querySelector("img").src;

            let existingItem = cart.find(cartItem => cartItem.name === itemName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: itemName, price: parseFloat(itemPrice), image: itemImage, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });

    function updateCartCount() {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById("cart-count").textContent = `(${totalItems})`;
    }
});
document.getElementById("payNow").addEventListener("click", function () {
    let totalAmount = document.getElementById("cartTotal").textContent;
    
    if (totalAmount === "0.00") {
        alert("Your cart is empty! Please add some items before proceeding to payment.");
    } else {

        window.location.href = "pay.html";
    }
});
