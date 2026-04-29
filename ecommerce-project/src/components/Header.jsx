import { NavLink } from 'react-router'
import logoWhiteImage from '../assets/images/logo-white.png'
import mobileLogoWhiteImage from '../assets/images/mobile-logo-white.png'
import searchIconImage from '../assets/images/icons/search-icon.png'
import cartIconImage from '../assets/images/icons/cart-icon.png'
import './Header.css'

export default function Header() {
  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src={logoWhiteImage} />
          <img className="mobile-logo"
            src={mobileLogoWhiteImage} />
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src={searchIconImage} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={cartIconImage} />
          <div className="cart-quantity">3</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  )
}