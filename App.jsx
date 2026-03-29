import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductList from './ProductList';
import CartItem from './CartItem';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      {/* Navbar — shown on Products and Cart pages */}
      {currentPage !== 'landing' && (
        <nav className="navbar">
          <div className="nav-brand" onClick={() => setCurrentPage('landing')}>
            <span className="leaf-icon">🌿</span>
            <span>Paradise Nursery</span>
          </div>
          <div className="nav-links">
            <button
              className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`}
              onClick={() => setCurrentPage('landing')}
            >
              Home
            </button>
            <button
              className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}
              onClick={() => setCurrentPage('products')}
            >
              Plants
            </button>
            <button
              className={`nav-link cart-link ${currentPage === 'cart' ? 'active' : ''}`}
              onClick={() => setCurrentPage('cart')}
              aria-label="Shopping cart"
            >
              <span className="cart-icon">🛒</span>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </nav>
      )}

      {/* Landing Page — uses .background-image class */}
      {currentPage === 'landing' && (
        <div className="landing background-image">
          <div className="landing-content">
            <div className="landing-badge">Est. 2024 · Lagos, Nigeria</div>
            <h1 className="landing-title">
              Paradise
              <br />
              <span className="accent">Nursery</span>
            </h1>
            <p className="landing-tagline">Where every leaf tells a story</p>
            <p className="landing-desc">
              Discover hand-curated houseplants that breathe life, beauty,
              and calm into your space. From aromatic herbs to air-purifying
              wonders — nature delivered to your door.
            </p>
            <button
              className="cta-btn"
              onClick={() => setCurrentPage('products')}
            >
              Get Started
              <span className="btn-arrow">→</span>
            </button>
          </div>
          <div className="landing-scroll-hint">scroll</div>
        </div>
      )}

      {/* Product Listing Page */}
      {currentPage === 'products' && (
        <ProductList onNavigateCart={() => setCurrentPage('cart')} />
      )}

      {/* Cart Page */}
      {currentPage === 'cart' && (
        <CartItem
          onContinueShopping={() => setCurrentPage('products')}
          onCheckout={() => setCurrentPage('checkout')}
        />
      )}

      {/* Checkout Coming Soon */}
      {currentPage === 'checkout' && (
        <div className="coming-soon-page">
          <div className="coming-soon-content">
            <span className="coming-soon-icon">🛍️</span>
            <h2>Coming Soon!</h2>
            <p>Our checkout experience is under construction. Check back soon!</p>
            <button className="cta-btn" onClick={() => setCurrentPage('products')}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
