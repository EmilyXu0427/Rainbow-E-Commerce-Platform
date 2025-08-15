const mongoose = require('mongoose');

const ProductAttributeSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String, // "format", "size", "color"
  values: [String], // ["ebook", "paperback", "audiobook"]
});

module.exports = mongoose.model('ProductAttribute', ProductAttributeSchema);