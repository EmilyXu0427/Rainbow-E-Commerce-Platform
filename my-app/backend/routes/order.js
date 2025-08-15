const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart =  require("../models/Cart");

// Get orders
router.get('/', async (req, res) => {
    try {
        // const orders = await Order.find();

        const orders = await Order.find().populate({
            path: 'cart',
            populate: {
                path: 'items.productId',
                model: 'Product',
                select: "name price"
            }
        });
        res.json(orders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ error: "Internal Server Error"});
    }
})

// POST order
router.post('/create', async (req, res) => {
    const { customerName, cartId } = req.body;

    if (!customerName || !cartId) {
        return res.status(400).json({ error: 'customerName and cartId are required' });
    }

    try {
        const newOrder = new Order({
            customerName,
            cart: cartId,
        });

        await newOrder.save();

        // Inactivate Cart
        await Cart.findByIdAndUpdate(cartId, { isActive: false });

        res.status(201).json({ message: "Order created", orderId: newOrder._id});
    } catch (err) {
        console.error("Fail to create new order:", err);
        res.status(500).json({error: "Faill to create new order"});
    }
});

module.exports = router;