// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');


router.get('/get/:email', getUserProfile);


router.put('/update/:id', updateUserProfile);

module.exports = router;
