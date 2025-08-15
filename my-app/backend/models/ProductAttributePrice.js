const mongoose = require('mongoose');

const ProductAttributePriceSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  variant: String, // "ebook", "paperback", "Red / Medium"
  price: Number,
});

module.exports = mongoose.model('ProductAttributePrice', ProductAttributePriceSchema);