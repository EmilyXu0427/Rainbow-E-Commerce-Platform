import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
	const [color, setColor] = useState("#e6e6fa");
	const rainbowColor = [
		"#FFE5E5",
		"#FFF1E0",
		"#FFFFE0",
		"#E6FFF2",
		"#E6F2FF",
		"#C3B1E1",
		"#E6E6FA",
	];
	const click = (color) => {
		let randomNumber = Math.floor(Math.random() * 7);
		setColor(rainbowColor[randomNumber]);
	};
	useEffect(() => {
		document.body.style.backgroundColor = color;
	}, [color]);
	return (
		<div className="navbar">
			<div className="nav-links">
				<Link className="nav-button" to="/">
					Home
				</Link>
				<Link className="nav-button" to="/skincare">
					Skincare
				</Link>
				<Link className="nav-button" to="/clothes">
					Clothes
				</Link>
				<Link className="nav-button" to="/books">
					Books
				</Link>
				<Link className="nav-button" to="/bestsellers">
					Best Sellers
				</Link>
				<Link className="nav-button" to="/search">
					Search
				</Link>
				<Link className="nav-button" to="/cart">
					<FaShoppingCart size={20} />
				</Link>
				<Link className="nav-button" to="/admin">
					Admin
				</Link>
				<button className="rainbow-button" onClick={click}>
					Rainbow
				</button>
			</div>
		</div>
	);
}
