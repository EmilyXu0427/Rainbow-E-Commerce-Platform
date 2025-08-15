import React, { useState } from "react";
import "../../styles/productpage.css";
import { SearchBar } from "../../components/SearchBar";
import { Product } from "../shop/Product";

// source: https://www.youtube.com/watch?v=sWVgMcz8Q44&list=PLf3aUFgaPryFkX5tpoZCgkaT_H0OmI4E4&index=4
export default function Search() {
	const [result, setResult] = useState([]);
	const [searched, setSearched] = useState(false);

	return (
		<div className="product-page">
			<h1 className="page-title">Find your product</h1>
			<SearchBar setResult={setResult} setSearched={setSearched} />
			<div className="card-grid" style={{ padding: "5rem" }}>
				{searched ? (
					result.length > 0 ? (
					result.map((product) => <Product data={product} />)
				) : (
					<p>No products found</p>
				)
				): null}
			</div>
		</div>
	);
}
