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


router.get('/getNotebooks', getNotebooks);
router.get('/getNotebookContent', getNotebookContent);

router.post('/createNotebook', createNotebook);

router.delete('/deleteNotebook/:id', deleteNotebook);

router.put('/saveNotebook/:id', saveNotebookContent);

module.exports = router;
