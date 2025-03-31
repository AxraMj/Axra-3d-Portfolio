const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

// Debug route to check admin (remove in production)
router.get('/check-admin', async (req, res) => {
  try {
    const admin = await Admin.findOne({}).select('-password');
    res.json({ adminExists: !!admin, admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register admin (this should be used only once to create the initial admin)
router.post('/register', async (req, res) => {
  try {
    // Check if an admin already exists
    const adminExists = await Admin.findOne({});
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const { username, password } = req.body;
    
    // Create new admin
    const admin = new Admin({
      username,
      password
    });

    await admin.save();

    // Generate token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Login admin
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username }); // Debug log

    // Find admin by username
    const admin = await Admin.findOne({ username });
    console.log('Found admin:', admin ? 'yes' : 'no'); // Debug log

    if (!admin) {
      console.log('No admin found'); // Debug log
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    console.log('Password match:', isMatch); // Debug log

    if (!isMatch) {
      console.log('Password does not match'); // Debug log
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful'); // Debug log

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get admin profile (protected route)
router.get('/profile', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 