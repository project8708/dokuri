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
    document.querySelectorAll('button[data-addtocart]').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.getAttribute('data-item');
            const price = parseInt(button.getAttribute('data-price'), 10);
            if (['연어 사시미', '센노 유메 14%', '소주', '맥주', '음료', '우롱차'].includes(item)) {
                showOptions(item, price, ['Option1', 'Option2', 'Option3']); // Add appropriate options here
            } else {
                addToCart(item, price);
            }
        });
    });

    const cartModal = document.querySelector('.cart-modal');
    document.querySelector('.cart-icon').addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    document.querySelector('.order-button').addEventListener('click', () => {
        sendOrder();
    });

    window.addEventListener('click', (event) => {
        if (event.target !== cartModal && !cartModal.contains(event.target) && event.target !== document.querySelector('.cart-icon')) {
            cartModal.style.display = 'none';
        }
    });
});

function closeCart() {
    document.querySelector('.cart-modal').style.display = 'none';
}

function showOptions(item, price, options) {
    const modal = document.querySelector('.option-modal');
    const optionsContainer = modal.querySelector('.options-container');
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => {
            addToCart(`${item} (${option})`, price);
            modal.style.display = 'none';
        });
        optionsContainer.appendChild(button);
    });
    modal.style.display = 'block';
}

function closeOptions() {
    document.querySelector('.option-modal').style.display = 'none';
}
