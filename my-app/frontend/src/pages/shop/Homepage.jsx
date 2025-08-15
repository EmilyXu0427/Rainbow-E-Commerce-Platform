import {React, useEffect, useState } from "react";
import "../../styles/Homepage.css";
import axios from "axios";
import { Product } from "../shop/Product"; 
import { api } from "../../api"

export default function Homepage() {
	const [bestSellers, setBestSellers] = useState([]);

	useEffect(() => {
		const fetchBestSellers = async () => {
			try {
				// const res = await axios.get("http://localhost:3000/products/category/best_seller");
				const res = await api.get("/products/category/best_seller");
				setBestSellers(res.data.slice(0, 3)); // take only first 3
			} catch (error) {
				console.error("Error fetching best sellers:", error);
			}
		};

		fetchBestSellers();
	}, []);

	return (
		<div className="homepage">
			<h1> Rainbow E-Commerce Platform</h1>
			<h2>Empower your beauty, Enrich your mind</h2>
			<h3> ~~~~~~~~ Your journey to beauty and wisedom ~~~~~~~~</h3>
			<h1 className="section-title">Best Sellers</h1>
			<div className="best-seller-grid">
				{bestSellers.map((product) => (
					<Product key={product._id} data={product} />
				))}
			</div>
		</div>
	);
}
