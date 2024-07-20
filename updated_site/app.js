const database = firebase.database();

let cart = {};

window.addToCart = function(item, price) {
    if (!cart[item]) {
        cart[item] = { price: price, quantity: 0 };
    }
    cart[item].quantity++;
    updateCartDisplay();
    showNotification(`${item} has been added to your cart.`);
}

window.updateCartDisplay = function() {
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

window.sendOrder = function() {
    const orderRef = database.ref('orders/' + Date.now());
    orderRef.set(cart).then(() => {
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

window.showOptions = function() {
    console.log('Options shown');
    // Implement the functionality as needed
}

window.showNotification = function(message) {
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

window.closeCart = function() {
    const cartContainer = document.querySelector('.cart-container');
    if (cartContainer) {
        cartContainer.style.display = 'none';
    }
}
