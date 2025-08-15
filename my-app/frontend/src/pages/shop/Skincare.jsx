import { React, useState, useEffect } from "react";
import { Product } from "./Product.jsx";
import "../../styles/productpage.css";
import { connect } from "react-redux";
import axios from "axios";
import { api } from "../../api.js";


const Skincare = () => {
	const [skinCareProducts, setSkinCareProducts] = useState([]);
	useEffect(() => {
		const fetchSkinCare = async () => {
			try {
				// const res = await axios.get("http://localhost:3000/products/category/skincare");
				const res = await api.get("/products/category/skincare");
				setSkinCareProducts(res.data);
			} catch (error) {
				console.error("Failed to fetch skincare:", error);
			}
		} 
		fetchSkinCare();
	}, []);

	return (
		<div className="product-page" style={{ padding: "5rem" }}>
			<h1 className="page-title">Chose your favourite SKINCARE product</h1>
			<div className="card-grid">
				{skinCareProducts.map((skincare) => (
					<Product key={skincare._id} data={skincare} />
				))}
			</div>
		</div>
	);
}

// const mapStateToProps = (state) => ({
// 	products: state.shop.products,
// });

// export default connect(mapStateToProps)(Skincare);

export default Skincare;