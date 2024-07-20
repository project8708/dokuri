// 기존 코드

// 개선된 코드 (모듈화 및 에러 핸들링 추가)
const cartModule = (() => {
  let cart = [];

  const addToCart = (name, price) => {
    cart.push({ name, price });
    showFeedback(`${name}이(가) 장바구니에 담겼습니다.`);
  };

  const showFeedback = (message) => {
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.innerHTML = message;
    document.body.appendChild(feedback);
    setTimeout(() => {
      feedback.remove();
    }, 2000);
  };

  const toggleCart = () => {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.classList.toggle('hidden');
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map(item => `<div>${item.name} - ${item.price}원</div>`).join('');
  };

  const sendOrder = async () => {
    try {
      const orderRef = db.ref('orders');
      await orderRef.push(cart);
      alert('주문이 성공적으로 전송되었습니다.');
      cart = [];
      toggleCart();
    } catch (error) {
      alert('주문 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return { addToCart, toggleCart, sendOrder };
})();

document.getElementById('order-button').addEventListener('click', cartModule.sendOrder);
