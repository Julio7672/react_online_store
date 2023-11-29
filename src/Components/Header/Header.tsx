import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { AiOutlineShoppingCart, AiOutlineHome } from 'react-icons/ai';

function Header() {
  return (
    <header className="header">
      <h1>Online Store</h1>
      <nav className="nav-bar">
        <Link className="nav-link" to="/">
          <AiOutlineHome className="home-icon" />
        </Link>
        <Link className="nav-link" to="/carrinho" data-testid="shopping-cart-button">
          <AiOutlineShoppingCart className="cart-icon" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
