const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Database connection
require('./models/dbConnection');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Routes
const notebookRoutes = require('./routes/notebookRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const youtubeRoutes = require('./routes/youtubeRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/notebook', notebookRoutes);
app.use('/api/generate', chatbotRoutes );
app.use('/api/youtube', youtubeRoutes);
app.use('/api/googleauth', authRoutes);

// Start the server
app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
