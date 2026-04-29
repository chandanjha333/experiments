import { Link } from 'react-router'
import logoImage from '../assets/images/logo.png'
import mobileLogoImage from '../assets/images/mobile-logo.png'
import checkoutLockIconImage from '../assets/images/icons/checkout-lock-icon.png'
import './CheckoutHeader.css'

export default function CheckoutHeader() {
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src={logoImage} />
              <img className="mobile-logo" src={mobileLogoImage} />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link"
              to="/">3 items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src={checkoutLockIconImage} />
          </div>
        </div>
      </div>
    </>
  )
}