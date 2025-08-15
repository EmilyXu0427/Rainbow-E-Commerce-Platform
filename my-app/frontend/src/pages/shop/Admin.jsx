import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/admin.css';
import { connect } from 'react-redux';
import AddNewProduct from './AddNewProduct';
import ProductDeletePage from "./ProductDeletePage";
import { fetchProducts } from "../../redux/Shopping/shopping-actions";
import { api } from "../../api"


const Admin = ( { products, fetchProducts }) => {
  const [carts, setCarts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState(''); // 'carts' | 'orders'| 'newProduct' | 'deleteProduct'

  const fetchCarts = async () => {
    try {
      // const res = await axios.get('/cart'); //the result is only active carts
      const res = await api.get('/cart'); //the result is only active carts

      const activeCarts = res.data;

      setCarts(activeCarts);
      setView('carts');
    } catch (err) {
      console.error("Failed to fetch carts:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      // const res = await axios.get('/order');
      const res = await api.get('/order');
      setOrders(res.data);
      setView('orders');
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const addProduct = async () => {
    setView("newProduct");
  }

  const deleteProduct = async () => {
    setView("deleteProduct");
  }

  return (
    <div className="adminpage">
      <h1>Administration Panel</h1>
      <div className="admin-buttons">
        <button onClick={fetchCarts} className="cart-list">Shopping Cart List</button>
        <button onClick={fetchOrders} className="order-list">Orders List</button>
        <button onClick={addProduct} className="add-product">Add New Product</button>
        <button onClick={deleteProduct} className="delete-product">Delete Product</button>
      </div>

      {view === 'carts' && (
        <div className="admin-list">
          <h2>Active Shopping Carts</h2>
          {carts.length === 0 ? <p>No active carts.</p> :
            carts.map((cart) => (
              <div key={cart._id} className="admin-card">
                <h3>Cart ID: {cart._id}</h3>
                <ul>
                  {cart.items.map((item, idx) => {
                    const product = products.find(p => p._id === item.productId);
                    return (
                        <li key={idx}>
                            {product ? product.name : 'Unknown'} x {item.quantity}</li>
                    )
                    })}
                </ul>
              </div>
            ))
          }
        </div>
      )}
      {view === 'orders' && (
        <div className="admin-list">
            <h2>Completed Orders</h2>
            {orders.length === 0 ? (
            <p>No orders yet.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="admin-card">
                    <h3>Order ID:{order._id}</h3>
                    <p><strong>Customer:</strong> {order.customerName}</p>
                    <ul>
                        {order.cart.items.map((item, idx) => (
                        <li key={idx}>
                            <strong>Product name:</strong> {item.productId?.name || "Unknown"}
                            <br/>
                            <strong>Subtotal:</strong> Price (${item.price}) * Quantity ({item.quantity}) = ${(item.price * item.quantity).toFixed(2)}
                        </li>
                        ))}
                    </ul>
                    </div>
                 ))
            )}
        </div>
            )}
      {view === 'newProduct' && (
        <div className="admin-list">
            <AddNewProduct/>
        </div>
            )}
      {view === 'deleteProduct' && (
        <div className="admin-list">
            <ProductDeletePage/>
        </div>
            )}
    </div>
  );
};

const mapStateToProps = (state) => {
		return {
            products: state.shop.products,
		}
}

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);