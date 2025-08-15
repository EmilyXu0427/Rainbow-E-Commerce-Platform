import { React, useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/product-detail.css";
import { connect, useDispatch } from "react-redux";
import { addToCart } from "../../redux/Shopping/shopping-actions";
import axios from "axios";
import { api } from "../../api";


function ProductDetail({ addToCart }) {
	const { id } = useParams();
	const navigate = useNavigate();

	const [product, setProduct] = useState(null);
	const [attributes, setAttributes] = useState([]);
	const [variantPrice, setVariantPrice] = useState([]);
	const [selectedVariant, setSelectedVariant] = useState("");
	const [currentPrice, setCurrentPrice] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				// const res = await axios.get(`/products/${id}`);
				const res = await api.get(`/products/${id}`);
				setProduct(res.data);
				setAttributes(res.data.attributes || []);
				setVariantPrice(res.data.variantPrices || []);
				setCurrentPrice(res.data.price);
			} catch (error) {
				console.error("Failed to fetch product:", error);
			}
		};
		fetchProduct();
	}, [id]);

	const handleVariantChange = (e) => {
		const variant = e.target.value;
		setSelectedVariant(variant);
		const found = variantPrice.find(v => v.variant === variant);
		setCurrentPrice(found ? found.price : product.price);
	};

	if (!product) {
		return <div>Loading product...</div>;
	}

	return (
		<div className="product-detail-container" style={{ padding: "5rem" }}>
			<img className="product-image" src={`/${product.image}.png`} alt={product.name} />
			<h1 className="product-name">{product.name}</h1>
			<p className="product-price">Price: ${currentPrice}</p>
			<p className="product-description">{product.description}</p>

			{attributes.length > 0 && (
				<div className="variant-select">
					<label>Select Variant:</label>
					<select value={selectedVariant} onChange={handleVariantChange}>
						<option value="">-- Select --</option>
						{attributes[0].values.map((val, idx) => (
							<option key={idx} value={val}>{val}</option>
						))}
					</select>
				</div>
			)}
			<button
				className="addToCartButton"
				onClick={() => {
					if (!selectedVariant && attributes.length > 0) {
						alert("Please select a variant"); // if variant not selected
						return;
					}
					addToCart(product._id, selectedVariant, 1);
					navigate("/cart");
				}}
			>
				Add To Cart
			</button>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	addToCart: (id, variantId, qty) => dispatch(addToCart(id, variantId, qty)),
});

export default connect(null, mapDispatchToProps)(ProductDetail);
