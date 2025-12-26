const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema({
  month: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("Revenue", revenueSchema);
