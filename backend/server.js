const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const Client = require("./models/Client");
const Freelancer = require("./models/Freelancer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);


app.post("/login", async (req, res) => {
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

    // const token = jwt.sign({ userId: user._id, userType }, "secretkey", { expiresIn: "1h" });
    const token = '234'
    console.log(token)

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});









// Register route for Freelancer
app.post("/auth/signup/freelancer", async (req, res) => {
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
app.post("/auth/signup/client", async (req, res) => {
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


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


















