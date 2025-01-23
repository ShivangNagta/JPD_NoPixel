const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Client = require("./models/Client");
const Freelancer = require("./models/Freelancer");
const HiringRequest = require("./models/HiringRequest")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const path = require('path');
const admin = require("./models/Admin");

const app = express();

const JWT_SECRET = process.env.JWT_SECRET;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/admin", admin);


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

// Fetch all freelancers
app.get("/api/freelancers", async (req, res) => {
  try {
    const freelancers = await Freelancer.find().select("-password"); // Exclude passwords from the response
    res.json(freelancers);
  } catch (error) {
    console.error("Error fetching freelancers:", error);
    res.status(500).json({ message: "Failed to fetch freelancers" });
  }
});

// Route to get freelancer details by ID
app.get("/api/freelancers/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id)

  try {
    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Fetch the freelancer by ID
    const freelancer = await Freelancer.findById(id).select("-password"); // Exclude sensitive data like password
    console.log(freelancer.name)
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.json(freelancer);
  } catch (error) {
    console.error("Error fetching freelancer by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory for storing files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.put("/api/freelancer", authenticateToken, upload.single("profileImage"), async (req, res) => {
  try {

    const { userId } = req.user; 

    const { name, education, location, experience, skills, description, jobHistory } = req.body;

    const freelancer = await Freelancer.findById(userId);
  
    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });



    // Update freelancer details
    freelancer.name = name || freelancer.name;
    freelancer.education = education || freelancer.education;
    freelancer.location = location || freelancer.location;
    freelancer.experience = experience || freelancer.experience;
    freelancer.skills = skills ? JSON.parse(skills) : freelancer.skills;
    freelancer.description = description || freelancer.description;
    freelancer.jobHistory = jobHistory ? JSON.parse(jobHistory) : freelancer.jobHistory;

    // If a new profile image is uploaded, update it
    if (req.file) {
      freelancer.avatar = req.file.path; // Save the path to the uploaded file
    }

    await freelancer.save();
    res.status(200).json({ message: "Freelancer details updated successfully", freelancer });
  } catch (error) {
    console.error("Error updating freelancer:", error);
    res.status(500).json({ message: "Failed to update freelancer details" });
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

// router.post('/hiring-requests', async (req, res) => {
//   try {
//       const { clientId, candidateId, message } = req.body;

//       // Validate required fields
//       if (!clientId || !candidateId || !message) {
//           return res.status(400).json({ error: 'All fields are required' });
//       }

//       // Simulate saving the hiring request
//       const newRequest = {
//           id: HiringRequests.length + 1, // Replace with database-generated ID
//           clientId,
//           candidateId,
//           message,
//           createdAt: new Date(),
//       };
//       HiringRequests.push(newRequest);

//       res.status(201).json({ message: 'Hiring request sent successfully', request: newRequest });
//   } catch (error) {
//       console.error('Error sending hiring request:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



app.post("/api/hiring-requests", authenticateToken, async (req, res) => {
  const { clientId, freelancerId, message } = req.body;

  const { userId } = req.user;
  try {
    const newRequest = await HiringRequest.create({
      clientId : userId,
      freelancerId,
      message,
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Error creating request", error });
  }
});


app.get('/api/hiring-requests', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user; 
    console.log('Fetching hiring requests for user:', userId);

    // Query MongoDB to find hiring requests for the freelancer
    const requests = await HiringRequest.find({ freelancerId: userId });
    console.log(requests)

    if (!requests || requests.length === 0) {
      return res.status(404).json({ error: 'No hiring requests found' });
    }

    res.status(200).json({ requests });
  } catch (error) {
    console.error('Error fetching hiring requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/hiring-requests/:id/accept', authenticateToken, async (req, res) => {
  try {
    const requestId = req.params.id;

    // Update the status of the hiring request to 'Accepted'
    const request = await HiringRequest.findByIdAndUpdate(
      requestId,
      { status: 'Accepted' },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: 'Hiring request not found' });
    }

    res.status(200).json({ message: 'Request accepted successfully', request });
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Decline a hiring request
app.post('/api/hiring-requests/:id/decline', authenticateToken, async (req, res) => {
  try {
    const requestId = req.params.id;

    // Update the status of the hiring request to 'Declined'
    const request = await HiringRequest.findByIdAndUpdate(
      requestId,
      { status: 'Declined' },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ error: 'Hiring request not found' });
    }

    res.status(200).json({ message: 'Request declined successfully', request });
  } catch (error) {
    console.error('Error declining request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Example route in Express.js
app.get('/api/hiring-requests/status/:clientId/:freelancerId', async (req, res) => {
  const { clientId, freelancerId } = req.params;

  console.log(clientId)
  console.log(freelancerId)
  try {
      const request = await HiringRequest.findOne({
          where: { clientId, freelancerId },
      });
      if (request) {
          res.json({ status: request.status });
      } else {
          res.json({ status: "No request sent" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching hire request status");
  }
});








// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
