const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variable from .env
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect app to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(()=> {
    console.log("successfully connected to MongoDB");
}).catch((err) => {
    console.error("fail to connect to MongoDB", err);
});

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})

// Root Route
app.get("/", (req, res) => {
    res.send("app is running...");
});

// const Product = require('./models/Product');
// const CategoryProduct = require('./models/Category');
// const Category = require('./models/CategoryProduct');
// // const CategoryProduct = require('./models/CategoryProduct');
// // const Category = require('./models/Category');
// const Cart = require('./models/Cart');

// Route to get all products
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

// Route to get all carts
const cartRoutes = require('./routes/cart');
app.use("/cart", cartRoutes);

// Route to get all orders
const orderRoutes = require('./routes/order');
app.use("/order", orderRoutes);

