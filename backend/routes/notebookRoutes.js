const express = require('express');
const router = express.Router();
const {
    getNotebooks,
    createNotebook,
    deleteNotebook,
    saveNotebookContent,
    getNotebookContent
} = require('../controllers/notebookController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/getNotebooks', authMiddleware, getNotebooks);
router.get('/getNotebookContent', authMiddleware, getNotebookContent);

router.post('/createNotebook', authMiddleware, createNotebook);

router.delete('/deleteNotebook/:id', authMiddleware, deleteNotebook);

router.put('/saveNotebook/:id', authMiddleware, saveNotebookContent);

module.exports = router;
