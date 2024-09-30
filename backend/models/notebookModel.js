const mongoose = require('mongoose');

const NotebookSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ''
    }
});

const Notebook = mongoose.model('notebooks', NotebookSchema);
module.exports = Notebook;
