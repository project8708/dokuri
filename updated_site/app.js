
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyCI2U6rdm1dVqHa4KTBO7ebiO49cnnM7W4",
    authDomain: "acoustic-arch-320110.firebaseapp.com",
    databaseURL: "https://acoustic-arch-320110-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "acoustic-arch-320110",
    storageBucket: "acoustic-arch-320110.appspot.com",
    messagingSenderId: "975479821242",
    appId: "1:975479821242:web:a6b4d128893cdec1100383",
    measurementId: "G-BGTD7LKT1C"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let cart = {};

function addToCart(item, price) {
    if (!cart[item]) {
        cart[item] = { price: price, quantity: 0 };
    }
    cart[item].quantity++;
    updateCartDisplay();
    showNotification(`${item} has been added to your cart.`);
}

function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    for (const [item, { price, quantity }] of Object.entries(cart)) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.textContent = `${item}: ${quantity} x ${price.toLocaleString()}원`;
        cartItemsContainer.appendChild(cartItem);
    }
    const total = Object.values(cart).reduce((sum, { price, quantity }) => sum + (price * quantity), 0);
    document.querySelector('.cart-total').textContent = `총액: ${total.toLocaleString()}원`;
}

function sendOrder() {
    const orderRef = ref(database, 'orders/' + Date.now());
    set(orderRef, cart).then(() => {
        showNotification('Order placed successfully.');
        cart = {};
        updateCartDisplay();
        closeCart();
    }).catch(error => {
        showNotification('Failed to place order: ' + error.message);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-addtocart]').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.getAttribute('data-item');
            const price = parseInt(button.getAttribute('data-price'));
            addToCart(item, price);
        });
    });
});

function showOptions() {
    console.log('Options shown');
    // Implement the functionality as needed
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 1000);
    }, 3000);
}

function closeCart() {
    const cartContainer = document.querySelector('.cart-container');
    if (cartContainer) {
        cartContainer.style.display = 'none';
    }
}
