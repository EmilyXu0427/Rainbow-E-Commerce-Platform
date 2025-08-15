import {React, useState, useEffect} from "react";
import { Product } from "./Product";
import "../../styles/productpage.css";
import { connect } from "react-redux";
import axios from "axios";
import { api } from "../../api"

const Clothes = () => {
	const [clothingProducts, setClothingProducts] = useState([]);
	useEffect(()=> {
		const fetchClothing = async() => {
			try {
				// const res = await axios.get("http://localhost:3000/products/category/clothing");
				const res = await api.get("/products/category/clothing");
				setClothingProducts(res.data);
			} catch (error) {
				console.error("Failed to fetch clothing:", error);
			}
		}
		fetchClothing();
	}, []);
	return (
		<div className="product-page" style={{ padding: "5rem" }}>
			<h1 className="page-title"> Choose your favourite CLOTHES</h1>
			<div className="card-grid">
				{clothingProducts.map((clothes) => (
					<Product key={clothes._id} data={clothes} />
				))}
			</div>
		</div>
	);
}

export default Clothes;
