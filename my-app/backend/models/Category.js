const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // book, skincare, clothing, best_sellers
});

module.exports = mongoose.model('Category', CategorySchema);