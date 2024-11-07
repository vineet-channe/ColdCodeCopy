import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const Library = ({ selectNotebook }) => {
    const [notebooks, setNotebooks] = useState([]);
    const [newNotebookTitle, setNewNotebookTitle] = useState('');
 
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const { email, token } = userInfo || {};

    const fetchNotebooks = async () => {
        try {
            const response = await axios.get('https://coldcodecopy.onrender.com/api/notebook/getNotebooks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    owner: email,
                },
            });
           
            setNotebooks(response.data);
        } catch (error) {
            console.error('Error fetching notebooks:', error);
        }
    };

    useEffect(() => {
        fetchNotebooks();
    }, [email, token]);

    const createNotebook = async () => {
        try {
            const response = await axios.post(
                'https://coldcodecopy.onrender.com/api/notebook/createNotebook',
                {
                    owner: email,
                    title: newNotebookTitle,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setNotebooks([...notebooks, response.data]); 
            setNewNotebookTitle(''); 
        } catch (error) {
            console.error('Error creating notebook:', error);
        }
    };

    // Delete a notebook
    const deleteNotebook = async (notebookId) => {
        try {
            await axios.delete(`https://coldcodecopy.onrender.com/api/notebook/deleteNotebook/${notebookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchNotebooks()
        } catch (error) {
            console.error('Error deleting notebook:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-white h-screen rounded-lg flex flex-col  items-center">
  <h2 className="text-4xl p-2 font-extrabold mb-4 bg-gradient-to-tr from-sky-700  to-sky-400 bg-clip-text text-transparent">
    Library
  </h2>

     <div className="mb-4 flex items-center">
    <input
      type="text"
      value={newNotebookTitle}
      onChange={(e) => setNewNotebookTitle(e.target.value)}
      placeholder="Give it a title"
      className="border p-2 rounded mr-2"
    />
    <button
      onClick={createNotebook}
      className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg "
    >
      Create Notebook
    </button>
  </div>

  {/* List of Notebooks */}
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 w-full max-w-4xl mt-2">
    {notebooks.map((notebook) => (
      <div
        key={notebook._id}
        className="border p-4 rounded min-h-40 shadow-lg flex flex-col justify-between  bg-cyan-100  "
      >
        <h3 className="text-3xl font-bold align-middle text-center text-sky-800">{notebook.title}</h3>
        <div className="mt-2 flex justify-evenly">
          <button
            onClick={() => selectNotebook(notebook)}
            className="text-2xl"
          >
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ color: "#1e4a6c", }} />
          </button>
          <button
            onClick={() => deleteNotebook(notebook._id)}
            className="text-2xl"
          >
            <FontAwesomeIcon icon={faTrash} style={{ color: "#1e4a6c", }} />
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
    );
};

export default Library;
