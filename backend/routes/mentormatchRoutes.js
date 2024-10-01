const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/userModel');
const Mentor = require('../models/mentorModel')


router.post('/connect', async (req, res) => {
    const { email } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        const apiUrl = `http://127.0.0.1:5000/match/${user._id}`;
        const apiResponse = await axios.get(apiUrl);

        const mentorIds = apiResponse.data; 
        if (!mentorIds || mentorIds.length === 0) {
            return res.status(404).json({ message: "No mentors found" });
        }

        
        const mentors = await Mentor.find({ _id: { $in: mentorIds } });
        console.log(mentors)
        
        res.json(mentors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching mentor data" });
    }
});

module.exports = router;
