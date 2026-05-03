import axios from 'axios';
import { Fragment } from 'react';
import { Link } from 'react-router';
import dayjs from 'dayjs';
import buyAgainImage from '../../assets/images/icons/buy-again.png';

export function OrderDetailsGrid({ order, loadCart }) {

  return (
    <div className="order-details-grid">
      {order.products.map((orderItem) => {
        const addToCart = async () => {
          await axios.post('/api/cart-items', {
            productId: orderItem.productId,
            quantity: 1
          });

          await loadCart();
        }

        return (
          <Fragment key={orderItem.productId}>
            <div className="product-image-container">
              <img src={orderItem.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderItem.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderItem.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderItem.quantity}
              </div>
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src={buyAgainImage} />
                <span className="buy-again-message" onClick={addToCart}>Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${order.id}/${orderItem.productId}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        )
      })}
    </div>
  );
}