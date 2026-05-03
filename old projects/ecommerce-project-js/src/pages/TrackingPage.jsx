import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import dayjs from "dayjs";
import Header from "../components/Header";
import { Link } from 'react-router';
import './TrackingPage.css';

export default function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getAppData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`)
      setOrder(response.data);
    };

    getAppData();
  }, [orderId]);

  if(!order) {return null;}

  const selectedProduct = order.products.
    find((product) => {
      return product.productId === productId;
    });

  const totalDeliveryTimeMs = selectedProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if(deliveryPercent > 100) deliveryPercent = 100;
  let isPreparing = 0, isShipped = 0, isDelivered = 0;
  if(deliveryPercent < 33) isPreparing = deliveryPercent;
  else if(deliveryPercent >= 33 && deliveryPercent < 100) isShipped = deliveryPercent;
  else isDelivered = deliveryPercent;

  return(
    <>
      <title>Tracking</title>
      <link rel="icon" href="tracking-favicon.png"/>

      <Header cart={cart}/>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent === 100 ? "Delivered on" : "Arriving on"}
            {dayjs(selectedProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {selectedProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {selectedProduct.quantity}
          </div>

          <img className="product-image" src={selectedProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div style={{width: `${deliveryPercent}%`}} className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  )
}