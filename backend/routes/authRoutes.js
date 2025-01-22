const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client");
const Freelancer = require("../models/Freelancer");

const router = express.Router();

// Register route for Freelancer
router.post("/auth/signup/freelancer", async (req, res) => {
  const { name, email, password} = req.body;

  try {
    const existingUser = await Freelancer.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newFreelancer = new Freelancer({
      name,
      email,
      password: hashedPassword,
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new Client({ name, email, password: hashedPassword });
    await newClient.save();
    res.status(201).json({ message: "Client registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/auth/login", async (req, res) => {
  const { email, password, userType } = req.body;

  let User;
  console.log(userType)
  if (userType === "client") User = Client;
  else if (userType === "freelancer") User = Freelancer;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    //const isMatch = await bcrypt.compare(password, user.password);

    let isMatch = false;

    if (password === user.password) isMatch = true;
    console.log(isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, userType }, "secretkey", { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
