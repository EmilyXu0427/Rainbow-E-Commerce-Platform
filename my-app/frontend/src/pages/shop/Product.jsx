import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/card.css";

export const Product = (props) => {
	const { _id, name, description, price, image } = props.data;
	const navigate = useNavigate();

	return (
		<>
			<div className="card">
				<img className="card-img" src={`/${image}.png`} alt={name} />
				<div className="card-body">
					<h3 className="card-name">{name}</h3>
					<p className="card-price">${price}</p>
					<p className="card-description">{description}</p>
					<button
						className="showDetailsButton"
						onClick={() => navigate(`/product/${_id}`)}
					>
						Show Details
					</button>
				</div>
			</div>		
		</>
	);
};