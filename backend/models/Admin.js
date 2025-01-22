const express = require('express');
const Freelancer = require('./Freelancer');
const Client = require('./Client');

const router = express.Router();

// Fetch pending users (freelancers and clients)
router.get('/pending-users', async (req, res) => {
  try {
    const pendingFreelancers = await Freelancer.find({ status: 'pending' }, 'name email');
    res.status(200).json({
      freelancers: pendingFreelancers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending users', error });
  }
});

// Approve user (freelancer or client)
router.post('/approve-user/:id', async (req, res) => {
  const { role, id } = req.params;

  try {
    if (role === 'freelancer') {
      await Freelancer.findByIdAndUpdate(id, { status: 'approved' });
    } else if (role === 'client') {
      await Client.findByIdAndUpdate(id, { status: 'approved' });
    }
    res.json({ message: 'User approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving user', error });
  }
});

// Decline user (freelancer or client)
router.post('/decline-user/:role/:id', async (req, res) => {
  const { role, id } = req.params;

  try {
    if (role === 'freelancer') {
      await Freelancer.findByIdAndDelete(id);
    } else if (role === 'client') {
      await Client.findByIdAndDelete(id);
    }
    res.json({ message: 'User declined successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error declining user', error });
  }
});

module.exports = router;
