import { React, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/shop/Homepage";
import Skincare from "./pages/shop/Skincare";
import Clothes from "./pages/shop/Clothes";
import Books from "./pages/shop/Books";
import BestSeller from "./pages/shop/BestSeller";
import Search from "./pages/shop/Search";
import Navbar from "./components/Navbar";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/shop/ProductDetail";
import Admin from "./pages/shop/Admin";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useDispatch } from "react-redux";
import { initCart, fetchProducts } from "./redux/Shopping/shopping-actions";
import CheckOut from "./pages/shop/CheckOut";


function App() {
	const dispatch = useDispatch();
	// initiate new empty cart to use
	// user need to start the browser and access the app using localhost: 5173 to initiate empty cart
	useEffect(()=>{
		dispatch(initCart()); //initate shopping cart once user start the app
	}, [dispatch]);
	
	// fetch all products data to use
	useEffect(() => {
    dispatch(fetchProducts());
    }, [dispatch]);

	return (
		<div className="App">
			{/* <Provider store={store}> */}
			<Router>
				<div>
					<Navbar />
				</div>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/skincare" element={<Skincare />} />
					<Route path="/clothes" element={<Clothes />} />
					<Route path="/books" element={<Books />} />
					<Route path="/bestsellers" element={<BestSeller />} />
					<Route path="/search" element={<Search />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/product/:id" element={<ProductDetail />}/>
					<Route path="/checkout" element={<CheckOut />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</Router>
			{/* </Provider> */}
		</div>
	);
}

export default App;
