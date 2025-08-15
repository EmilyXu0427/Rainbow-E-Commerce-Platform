import React, { useEffect, useState } from "react";
import { Product } from "./Product";
import "../../styles/productpage.css";
import { connect } from "react-redux";
import axios from "axios";
import { api } from "../../api"

const BestSeller = () =>  {

	const [bestSellerProducts, setBestSellerProducts] = useState([]);
	useEffect(() => {
		const fetchBestSeller = async() => {
			try {
				// const res = await axios.get("http://localhost:3000/products/category/best_seller");
				const res = await api.get("http://localhost:3000/products/category/best_seller");
				setBestSellerProducts(res.data);
			} catch (error) {
				console.error("Failed to fetch bestseller:", error);
			}
		}
		fetchBestSeller();
	}, []);

	return (
		<div className="product-page" style={{ padding: "5rem" }}>
			<h1 className="page-title">These are the best seller</h1>
			<div className="card-grid">
				{bestSellerProducts.map((bestseller) => (
					<Product key={bestseller._id} data={bestseller} />
				))}
			</div>
		</div>
	);
}

export default BestSeller;