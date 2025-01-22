const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const Client = require("./models/Client");
const Freelancer = require("./models/Freelancer");


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



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
