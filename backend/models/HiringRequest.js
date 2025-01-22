const mongoose = require("mongoose");

const HiringRequestSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Freelancer",
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HiringRequest", HiringRequestSchema);
