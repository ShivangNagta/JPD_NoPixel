const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client");
const Freelancer = require("../models/Freelancer");

const router = express.Router();

// Register route for Freelancer
router.post("/auth/signup/freelancer", async (req, res) => {
  const { name, email, password} = req.body;
  console.log(name)
  console.log(email)
  console.log(password)

  try {
    const existingUser = await Freelancer.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newFreelancer = new Freelancer({
      name,
      email,
      password,
    });

    await newFreelancer.save();
    res.status(201).json({ message: "Freelancer registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Register route for Client
router.post("/auth/signup/client", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Client.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new Client({ name, email, password});
    await newClient.save();
    res.status(201).json({ message: "Client registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
