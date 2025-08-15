import { React, useEffect, useState} from "react";
import "../../styles/product-delete-page.css";
import { api } from "../../api";


function ProductDeletePage() {
	const [products, setProducts] = useState([]);

    useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await api.get("/products");
				setProducts(res.data);
			} catch (err) {
				console.error("Failed to fetch products:", err);
			}
		};

		fetchProducts();
	}, []);

	const deleteProduct = async (id) => {
		try {
			await api.delete(`/products/${id}`);
			alert("Product deleted successfully");
            console.log(id)
            setProducts(products.filter(p => p._id !== id));
		} catch (err) {
			console.error("Failed to delete product:", err);
			alert("Failed to delete product");
		}
	};

	return (
        <div className="product-list-delete-page">
            <h2> Delete Products</h2>
            {products.length === 0 ? (
                <p>No products avaialable.</p>):
                (<div className="product-list">
                    {products.map (product => (
                        <div key={product._id} className="product-delete-container" style={{ padding: "5rem" }}>
                            <img className="product-delete-image" src={`/${product.image}.png`} alt={product.name} />
                            <h1 className="product-delete-name">{product.name}</h1>
                            <button className="product-delete-button"
                                onClick={() => {
                                    deleteProduct(product._id)
                                }}
                            >
                                Delete Product
                            </button>
                        </div>
                        ))}
                </div>)}
        </div>
	);
}

export default ProductDeletePage;
