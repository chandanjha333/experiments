import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import { Link } from 'react-router'
import './OrdersPage.css'
import { OrdersGrid } from './OrdersGrid'

export default function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    };
    
    getHomeData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" href="orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders}/>
      </div>
    </>
  )
}