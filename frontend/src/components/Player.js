import {useState} from 'react';
import { useParams } from 'react-router-dom';
import Pragya from './Pragya';
import Notebook from './Notebook';
import Library from './Library';


const Player = () => {
  const { videoId } = useParams();
  const [selectedNotebook, setSelectedNotebook] = useState(null);

  const selectNotebook = (notebook) => {
    setSelectedNotebook(notebook);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-sky-100">
      <div className="flex flex-col h-screen w-full p-2 space-y-2">
        <div className="flex-1 relative rounded-lg overflow-hidden h-full shadow-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Player"
          ></iframe>
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

export default Player;
