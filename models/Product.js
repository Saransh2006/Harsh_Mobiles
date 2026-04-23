const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    features: [String],
    category: String // mobiles or electronics
});

module.exports = mongoose.model("Product", productSchema);