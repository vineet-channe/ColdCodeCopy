const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  age: {
    type: Number,
  },
  academic_interests: {
    type: [String],
  },
  career_aspirations: {
    type: [String],
  },
  expected_hours: {
    type: String,
  },
  preferred_languages: {
    type: [String],
  },
  preferred_communication: {
    type: [String],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('students', UserSchema);

module.exports = UserModel;
