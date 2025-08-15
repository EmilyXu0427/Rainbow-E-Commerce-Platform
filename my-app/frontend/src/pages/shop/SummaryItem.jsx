import React from 'react'
import "../../styles/summary-item.css"
import { connect } from "react-redux";

const SummaryItem = ({item, products}) => {
    const product = products.find((p) => p._id === item.productId);
  return (
    <div className="summary-item">
        <img className = 'summary-item-image' src={`/${product.image}.png`}/>
        <div className="summary-item-details">
            <p className = 'summary-item-id'>Product Name: {product.name} </p>
            <p className = 'summary-item-qty'>Quantity: {item.quantity} </p>
            <p className = 'summary-item-price'>Price: ${item.price} </p>
            <p className = 'summary-item-total'>Subtotal: ${item.price * item.quantity.toFixed(2)}</p>   
        </div>
    </div>
  )
}
const mapStateToProps = (state) => {
		return {
            products: state.shop.products,
		}
	}

export default connect(mapStateToProps)(SummaryItem);
