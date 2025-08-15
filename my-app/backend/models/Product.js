const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String, // e.g., "skincare_1.png"
  description: String,
  price: Number // base price
});

module.exports = mongoose.model('Product', ProductSchema);