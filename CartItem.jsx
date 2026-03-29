import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping, onCheckout }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const parsePrice = (cost) => parseFloat(cost.replace('$', ''));

  const totalCost = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.cost) * item.quantity,
    0
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2 className="cart-title">Your Cart</h2>
        <span className="cart-count">
          {cartItems.length} {cartItems.length === 1 ? 'item type' : 'item types'}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🌱</div>
          <h3>Your cart is empty</h3>
          <p>Add some plants to get started</p>
          <button className="continue-btn" onClick={onContinueShopping}>
            Browse Plants
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => {
              const unitPrice = parsePrice(item.cost);
              const subtotal = unitPrice * item.quantity;
              return (
                <div key={item.name} className="cart-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-unit">Unit price: {item.cost}</p>
                    <p className="cart-item-subtotal">
                      Total cost:{' '}
                      <strong>${subtotal.toFixed(2)}</strong>
                    </p>
                  </div>
                  <div className="cart-item-controls">
                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => handleDecrement(item)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleIncrement(item)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-ship">Free 🌿</span>
            </div>
            <div className="summary-row total-row">
              <span>Total Amount</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <button className="continue-btn" onClick={onContinueShopping}>
                ← Continue Shopping
              </button>
              <button className="checkout-btn" onClick={onCheckout}>
                Checkout →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
