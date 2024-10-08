// controllers/userController.js
const User = require('../models/userModel');


exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.find({"email" : req.params.email});
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error });
  }
};


exports.updateUserProfile = async (req, res) => {
    try {
        console.log(req.body)
      const { email } = req.body; 
      const user = await User.findOneAndUpdate({ email }, req.body, { new: true }); // Find user by email and update
        console.log(user)
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      res.json({ success: true, message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error', error });
    }
  };
  