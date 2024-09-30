const express = require('express');
const { getAnswer } = require('../controllers/chatbotController');
const router = express.Router();

router.post('/getanswer', getAnswer);

module.exports = router;
