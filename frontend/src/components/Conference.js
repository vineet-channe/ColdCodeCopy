import {useState} from 'react';
import { useParams } from 'react-router-dom';
import Pragya from './Pragya';
import Notebook from './Notebook';
import Library from './Library';
import Videocall from './VideoPage';


const Conference = () => {
 
  const [selectedNotebook, setSelectedNotebook] = useState(null);

  const selectNotebook = (notebook) => {
    setSelectedNotebook(notebook);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-sky-100">
      <div className="flex flex-col h-screen w-full p-2 space-y-2">
        <div className="flex-1 relative rounded-lg  h-full shadow-lg">
          <Videocall/>
        </div>
        <Pragya />
      </div>
      <div className="flex flex-col h-screen p-2">
      {selectedNotebook ? (
          <Notebook selectNotebook={selectNotebook} notebook_id={selectedNotebook._id} notebook={selectedNotebook} /> 
        ) : (
          <Library selectNotebook={selectNotebook} /> 
        )}
      </div>
    </div>
  );
};

export default Conference;
