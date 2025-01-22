const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const Client = require("./models/Client");
const Freelancer = require("./models/Freelancer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

const JWT_SECRET = process.env.JWT_SECRET;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());


// Middleware to authenticate and decode token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "Access token required" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // Attach user info to the request
    next();
  });
}

// Login Route
app.post("/login", async (req, res) => {
  const { email, password, userType } = req.body;

  let User;
  if (userType === "client") User = Client;
  else if (userType === "freelancer") User = Freelancer;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, userType }, JWT_SECRET, { expiresIn: "10h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Register Route for Freelancer
app.post("/auth/signup/freelancer", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Freelancer.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newFreelancer = new Freelancer({ name, email, password: hashedPassword });

    await newFreelancer.save();
    res.status(201).json({ message: "Freelancer registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Register Route for Client
app.post("/auth/signup/client", async (req, res) => {
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

// Fetch Freelancer Details
app.get("/api/freelancer", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  try {
    const freelancer = await Freelancer.findById(userId).select("-password");
    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });

    res.json(freelancer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch Client Details
app.get("/api/client", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  try {
    const client = await Client.findById(userId).select("-password");
    if (!client) return res.status(404).json({ message: "Client not found" });

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update Freelancer Details
app.put("/api/freelancer", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const updateData = req.body;

  try {
    const updatedFreelancer = await Freelancer.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedFreelancer) return res.status(404).json({ message: "Freelancer not found" });

    res.json(updatedFreelancer);
  } catch (error) {
    res.status(400).json({ message: "Error updating freelancer", error });
  }
});

// Update Client Details
app.put("/api/client", authenticateToken, async (req, res) => {
  const { userId } = req.user;
  const updateData = req.body;

  try {
    const updatedClient = await Client.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedClient) return res.status(404).json({ message: "Client not found" });

    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: "Error updating client", error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
