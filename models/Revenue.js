import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema({
  month: { type: String, required: true },
  amount: { type: Number, required: true },
});

export default mongoose.model("Revenue", revenueSchema);
