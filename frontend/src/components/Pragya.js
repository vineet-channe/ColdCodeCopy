import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function Pragya() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const processResponse = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const codeElements = doc.querySelectorAll('pre code');

    codeElements.forEach((codeElement) => {
      codeElement.textContent = codeElement.innerHTML;
    });

    return doc.body.innerHTML;
  };

  const handleSend = async () => {
    if (message.trim() === '') return;
    setChatHistory([...chatHistory, { role: 'user', content: message }]);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/generate/getanswer', { query: message });
      const { answer } = response.data;
      const processedAnswer = processResponse(answer);

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'assistant', content: processedAnswer }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: 'Error processing your message' }
      ]);
    }
  };

  return (
    <div className="border rounded-t-xl  h-1/2 w-full flex flex-col relative shadow-2xl">
      <div ref={chatContainerRef} className="p-4  h-full pb-16 w-full overflow-y-auto bg-gray-50 no-scrollbar">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg text-sm ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              dangerouslySetInnerHTML={{ __html: message.content }} // Renders HTML content, including processed code
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 w-full p-1 flex items-center bg-white">
        <img src='/bot.jpeg' className='h-12 w-12 rounded-full p-1' alt='bot'/>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full py-2 px-4 bg-gray-300 border  rounded-full focus:outline-none focus:ring focus:ring-slate-600 transition"
          
        />

        <button
          onClick={handleSend}
          className="px-2 text-white text-2xl transition"
        >
          <FontAwesomeIcon icon={faPaperPlane} style={{color: "#01599d",}} />
        </button>
      </div>
    </div>
  );
}

export default Pragya;
