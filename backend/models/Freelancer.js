const mongoose = require("mongoose");

const freelancerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Freelancer = mongoose.model("Freelancer", freelancerSchema);

module.exports = Freelancer;
