import React, { useEffect, useState } from "react";
import { Product } from "./Product";
import "../../styles/productpage.css";
// import { connect } from "react-redux";
import axios from "axios";
import { api } from "../../api"

const Books = () =>  {

	const [bookProducts, setBookProducts] = useState([]);
	useEffect(() => {
		const fetchBooks = async() => {
			try {
				// const res = await axios.get("http://localhost:3000/products/category/book");
				const res = await api.get("/products/category/book");
				setBookProducts(res.data);
			} catch (error) {
				console.error("Failed to fetch books:", error);
			}
		}
		fetchBooks();
	}, []);

	return (
		<div className="product-page" style={{ padding: "5rem" }}>
			<h1 className="page-title">Chose your favourite BOOK</h1>
			<div className="card-grid">
				{bookProducts.map((book) => (
					<Product key={book._id} data={book} />
				))}
			</div>
		</div>
	);
}

export default Books;
