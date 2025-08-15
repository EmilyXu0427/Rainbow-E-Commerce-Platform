import { React, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "../styles/search-bar.css";
import { api } from '../api';

export const SearchBar = ({ setResult, setSearched }) => {
	const [input, setInput] = useState("");

	const handleChange = (value) => {
		setInput(value);
		searchProduct(value);
	};
	
	const searchProduct = async (value) => {
		try {
			// const res = await axios.get(`/products/search/${value}`);
			const res = await api.get(`/products/search/${value}`);
			console.log("search result:", res.data);

			// debug: this is important otherwise nothing shown on the search page
			if (res.data.message === "No products found") {
				setResult([]);
			} else {
				setResult(res.data);
			}
			setSearched(true);
		} catch (error) {
			console.log("Fail to search product:", error);
			setResult([]);
			setSearched(true);
		}
	};

	return (
		<div className="input-wrapper">
			<FaSearch id="search-icon" />
			<input
				placeholder="Enter To Search"
				value={input}
				onChange={(e) => handleChange(e.target.value)}
			/>
		</div>
	);
};
