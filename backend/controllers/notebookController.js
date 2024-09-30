const Notebook = require('../models/notebookModel');

const getNotebooks = async (req, res) => {
    try {
        const { owner } = req.query;

        if (!owner) {
            return res.status(400).json({ error: 'Owner is required' });
        }

        const notebooks = await Notebook.find({ owner });
        res.json(notebooks);
    } catch (error) {
        console.error('Error fetching notebooks:', error);
        res.status(500).json({ error: 'Error fetching notebooks' });
    }
};

const createNotebook = async (req, res) => {
    try {
        const { owner, title } = req.body;

        if (!owner || !title) {
            return res.status(400).json({ error: 'Owner and title are required' });
        }

        const newNotebook = new Notebook({
            owner,
            title,
            content: ''
        });

        await newNotebook.save();
        res.status(201).json(newNotebook);
    } catch (error) {
        console.error('Error creating notebook:', error);
        res.status(500).json({ error: 'Error creating notebook' });
    }
};

const deleteNotebook = async (req, res) => {
    try {
        const { id } = req.params;
        const notebook = await Notebook.findByIdAndDelete(id);

        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found' });
        }

        res.status(200).json({ message: 'Notebook deleted' });
    } catch (error) {
        console.error('Error deleting notebook:', error);
        res.status(500).json({ error: 'Error deleting notebook' });
    }
};

const saveNotebookContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
       
        const notebook = await Notebook.findByIdAndUpdate(
            id,
            { content },
            { new: true }
        );

        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found' });
        }

        res.status(200).json(notebook);
    } catch (error) {
        console.error('Error updating notebook content:', error);
        res.status(500).json({ error: 'Error updating notebook content' });
    }
};

const getNotebookContent = async (req, res) => {
    try {
        const { id } = req.params;

        const notebook = await Notebook.findById(id);

        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found' });
        }

        res.status(200).json(notebook.content);
    } catch (error) {
        console.error('Error retriving notebook content:', error);
        res.status(500).json({ error: 'Error retriving notebook content' });
    }
};

module.exports = {
    getNotebooks,
    createNotebook,
    deleteNotebook,
    saveNotebookContent,
    getNotebookContent
};
