import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping, onCheckout }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Helper: strip "$" and convert to number
  const parsePrice = (cost) => parseFloat(cost.replace('$', ''));

  // Calculate cost for all units of one item type
  const calculateTotalCostForItem = (item) => {
    return parsePrice(item.cost) * item.quantity;
  };

  // Calculate the grand total of the entire cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + calculateTotalCostForItem(item);
    }, 0);
  };

  // Increment quantity for an item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity — remove item if quantity reaches 0
  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  // Delete item from cart entirely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const totalAmount = calculateTotalAmount();

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
          {/* Individual cart item cards */}
          <div className="cart-items">
            {cartItems.map((item) => {
              const unitPrice = parsePrice(item.cost);
              const itemTotalCost = calculateTotalCostForItem(item);

              return (
                <div key={item.name} className="cart-card">
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />

                  {/* Name, unit cost, total cost for this item */}
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-unit">
                      Unit Price: <strong>${unitPrice.toFixed(2)}</strong>
                    </p>
                    <p className="cart-item-subtotal">
                      Total Cost ({item.quantity} × ${unitPrice.toFixed(2)}):{' '}
                      <strong className="item-total">${itemTotalCost.toFixed(2)}</strong>
                    </p>
                  </div>

                  {/* Quantity controls + Delete */}
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
                      onClick={() => handleRemove(item)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary with total cart amount */}
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-ship">Free 🌿</span>
            </div>
            <div className="summary-row total-row">
              <span>Total Cart Amount</span>
              <span>${totalAmount.toFixed(2)}</span>
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
