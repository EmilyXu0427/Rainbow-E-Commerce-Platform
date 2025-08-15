import React, { useState } from "react";
import "../../styles/cart-item.css";
import { connect } from "react-redux";
import { removeFromCart, adjustQty } from "../../redux/Shopping/shopping-actions";

const CartItem = ({ item, products, removeFromCart, adjustQty }) => {
	const [input, setInput] = useState(item.quantity || 1);

	// retrieve product information from redux global products
	const product = products.find((p) => p._id === item.productId);
	const imageSrc = product ? `/${product.image}.png` : "/placeholder.png";
	const productName = product ? product.name : "placeholder";

	const onChangeHandler = (e) => {
		const newQty = Math.max(1, parseInt(e.target.value));
		setInput(newQty);
		adjustQty(item.productId, newQty);
	};

	return (
		<div className="cartItem">
			<img src={imageSrc} />
			<div className="description">
				<p>{productName}</p>
				{item.variant && <p>Variant: {item.variant}</p>}
				<p>${item.price}</p>
				<div className="countHandler">
					<input
						min="1"
						type="number"
						id="qty"
						name="qty"
						value={input}
						onChange={onChangeHandler}
					/>
					<button onClick={() => removeFromCart(item.productId)}>Remove</button>
				</div>
				{/* bug using item.qty for subtotal calculation, should use input */}
				<p>Subtotal: ${(item.price * input).toFixed(2)}</p> 
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	products: state.shop.products,
});

const mapDispatchToProps = (dispatch) => ({
	removeFromCart: (id) => dispatch(removeFromCart(id)),
	adjustQty: (id, value) => dispatch(adjustQty(id, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

