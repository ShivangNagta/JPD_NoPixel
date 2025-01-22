const mongoose = require("mongoose");

const freelancerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: { type: [String], default: [] },
  experience: { type: Number, default: 0 },
  education: { type: String, default: "" },
  location: { type: String, default: "" },
  avatar: { type: String, default: "" },
  description: { type: String, default: "" },
  jobHistory: [
    {
      title: { type: String, default: "" },
      company: { type: String, default: "" },
      period: { type: String, default: "" },
    },
  ],
});

const Freelancer = mongoose.model("Freelancer", freelancerSchema);

module.exports = Freelancer;


