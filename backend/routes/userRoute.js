// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

// GET /api/user/:id - Get a user profile by ID
router.get('/get/:email', getUserProfile);

// PUT /api/user/:id - Update a user profile by ID
router.put('/update/:id', updateUserProfile);

module.exports = router;
