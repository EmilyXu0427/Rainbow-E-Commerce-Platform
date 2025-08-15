const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      variant: String,     // paperback, blue-medium, etc.
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true }
    }
  ],
  isActive: { type: Boolean, default: true }, // active cart or completed order cart
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', CartSchema);