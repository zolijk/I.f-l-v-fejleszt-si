let cart = [];
let totalPrice = 0;


const products = [
    { id: 1, name: 'Póló', price: 11000 },
    { id: 2, name: 'Pulóver', price: 24000 }
];


function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    
    updateCart();
}


function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 
    
    totalPrice = 0;

    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <p>${item.name} - ${item.quantity} db</p>
            <p>Ár: ${item.price * item.quantity} Ft</p>
        `;
        cartItemsContainer.appendChild(cartItemElement);

        totalPrice += item.price * item.quantity;
    });

    
    document.getElementById('total-price').innerText = `Összesen: ${totalPrice} Ft`;
}

document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        alert(`Fizetendő összeg: ${totalPrice} Ft. Köszönjük a vásárlást!`);
        cart = []; 
        updateCart(); 
        window.location.href = "cart.html"; 
    } else {
        alert('A kosár üres!');
    }
});



    