import { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import axios from 'axios';
import BlotFormatter from 'quill-blot-formatter'; 
import { FaArrowLeft } from 'react-icons/fa';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/blotFormatter', BlotFormatter);

const Notebook = ({notebook,selectNotebook  }) => {
  const [editorHtml, setEditorHtml] = useState(notebook.content);

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const { email, token } = userInfo || {};

  const saveContent = async () => {
   
    if (!email || !token) {
      alert('User is not authenticated');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/notebook/saveNotebook/${notebook._id}`,
        {         
          content: editorHtml, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Content saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'], 
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import('parchment'), 
      modules: ['Resize', 'DisplaySize'],
    },
    blotFormatter: {},
  };

  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'link', 'image', 'video', // Include video in formats
  ];

  return (
    <div className="container bg-white p-4 rounded-lg shadow-lg h-screen flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <button onClick={() => selectNotebook(null)} className="flex items-center p-2 text-gray-600 hover:text-gray-900">
        <FaArrowLeft className="mr-2" />
        <span className="hidden sm:inline">Back</span>
      </button>
     <h2 className="text-3xl font-bold text-center flex-grow">{notebook?.title || 'Untitled Notebook'}</h2>
    </div>

    <div className='h-full'>
    <ReactQuill
      theme="snow"
      value={editorHtml}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      bounds={'#root'}
      placeholder={'Write your thoughts down...'}
      className="h-[510px] mb-4" 
    />
    </div>
    <button onClick={saveContent} className="bg-blue-700 shadow-lg w-fit text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Save
      </button>
  </div>

  );
};

export default Notebook;
