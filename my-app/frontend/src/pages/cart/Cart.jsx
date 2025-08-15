import React, { useContext, useState, useEffect } from "react";
import CartItem from "../cart/CartItem";
import { connect } from "react-redux";
import CheckOut from "../shop/CheckOut";
import { useNavigate } from "react-router-dom";

// const Cart = ({ cart }) => {
const Cart = ({ cart, cartId }) => {
	const navigate = useNavigate();

	// extract thte current cartId
	// const [cartId, setCartId] = useState("");
	// useEffect(()=>{
	// 	const cartId = sessionStorage.getItem("cartId");
	// 	if(cartId){
	// 		setCartId(cartId);
	// 	}
	// }, []);
	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	if (!cartId) return <p style={{ padding: "5rem" }}>Creating your cart…</p>;

	return (
		<div className="product-page" style={{ padding: "5rem" }}>
			<div>
				<h1 className="page-title">Your Cart Items</h1>
				<h2>Cart ID: {cartId}</h2>
				<div className="cartItems">
					{cart.map((item) => (
          			<CartItem key={item.productId} item={item} />
        			))}
				</div>
			</div>
			<div className="totalPrice">
				<h2>Total Price: ${total.toFixed(2)}</h2>
			</div>
			<button onClick={() => navigate("/checkout")} disabled={cart.length === 0}> Checkout </button>
		</div>
	);
}

const mapStateToProps = (state) => {
		return {
			cart: state.shop.cart,
			cartId: state.shop.cartId
		}
	}

export default connect(mapStateToProps)(Cart);

