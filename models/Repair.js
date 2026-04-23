const mongoose = require("mongoose");

const repairSchema = new mongoose.Schema({
    id: String,
    name: String,
    device: String,
    status: String
});

module.exports = mongoose.model("Repair", repairSchema);