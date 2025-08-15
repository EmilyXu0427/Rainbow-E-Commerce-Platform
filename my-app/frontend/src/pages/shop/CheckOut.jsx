import { React, useState, useEffect } from 'react';
import { connect, useDispatch } from "react-redux";
import SummaryItem from './SummaryItem';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { initCart } from '../../redux/Shopping/shopping-actions';
import { api } from "../../api"

const CheckOut = ( { cart, products, cartId }) => {
    // const cartId = sessionStorage.getItem("cartId"); 
    const [customerName, setCustomerName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = sessionStorage.getItem("customerName");
        if (storedName) {
            setCustomerName(storedName);
        } else {
            const name = prompt("Please enter your name:");
            if (name) {
                setCustomerName(name);
                sessionStorage.setItem("customerName", name);
            }
        }
    }, []);

    const saveOrder = async () => {
        try {
            // const response = await axios.post('/order/create', {
            const response = await api.post('/order/create', {
                customerName,
                cartId
            });

        const orderId = response.data.orderId; // extract order id to show customer
        alert(`Your order number is: ${orderId}`);

        // clear old cart and update redux state
        dispatch({ type: "CLEAR_CART" });
        sessionStorage.removeItem("cartId");
        sessionStorage.removeItem("customerName");

        // create a new cart for continuing another round of shopping
       dispatch(initCart());

        navigate("/");
        
        } catch (error) {
            console.error("Fail to create order:", error);
        }
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
		<div className="checkout-page" style={{ padding: "5rem" }}>
			<div>
				<h1 className="page-title">Confirm Your Order Items</h1>
				<h2>Cart ID: {cartId || "Not Found"}</h2>
                <h2>Customer Name: {customerName}</h2>
				<div className="checkoutItems">
                    {cart.map((item, idx) => {
                        // const product = products.find((p) => p._id === item.productId);
                        return (
                            <div key={idx}>
                                <SummaryItem item = {item} />
                        </div>
                        );
                    })}
                </div>
			</div>
			<div className="totalPrice">
				<h2>Total Price: ${total.toFixed(2)}</h2>
			</div>
            <button onClick = {() => saveOrder()}>Save Order</button>
		</div>
  )
}
const mapStateToProps = (state) => {
		return {
			cart: state.shop.cart,
            products: state.shop.products,
            cartId: state.shop.cartId
		}
	}

export default connect(mapStateToProps)(CheckOut);
