// Cart functionality
let cartItems = [];

// Example products data (this would normally come from the backend or an API)
const products = [
    { id: 1, name: "Póló", price: 11000, image: "paradise.png" },
    { id: 2, name: "Pulóver", price: 24000, image: "Untitled design1.png" },
  
];


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    updateCart();
}


function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;

        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toFixed(2)}HUF</p>
                </div>
                <div class="cart-item-quantity">
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input">
                    <button class="cart-item-remove" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    cartTotalElement.textContent = `${total.toFixed(2)}HUF`;

    // Attach event listeners to quantity inputs and remove buttons
    attachCartEventListeners();
}

// Remove item from cart
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCart();
}

// Update item quantity
function updateItemQuantity(productId, newQuantity) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity);
    }
    updateCart();
}

// Attach event listeners to cart item quantity inputs and remove buttons
function attachCartEventListeners() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const removeButtons = document.querySelectorAll('.cart-item-remove');

    quantityInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const newQuantity = e.target.value;
            updateItemQuantity(productId, newQuantity);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    
    addToCart(1);  
    addToCart(2);  
});
