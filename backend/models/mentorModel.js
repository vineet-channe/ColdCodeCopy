const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  name: {
    type: String,

  },
  background_industry: {
    type: String,

  },
  skills_expertise: {
    type: String,

  },
  availability: {
    type: String,
   
  },
  languages: [
    {
      type: String,
    },
  ],
  communication_preferences: [
    {
      type: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('mentors', MentorSchema);
