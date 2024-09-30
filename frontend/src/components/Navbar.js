import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
   
    const navigate = useNavigate();


    const logout = () => {
        localStorage.removeItem('user-info');
        navigate('/Login');
      };
    
    
  const user = JSON.parse(localStorage.getItem('user-info'));
  const img = user.image


    return (
        <div>
            <header className="bg-white shadow-lg shadow-cyan-100 py-2 top-0 fixed w-full z-10 border-b-1 border-cyan-300 bg-gradient-to-t">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">Sarthi</h1>
                    
                    <div className="sm:hidden md:flex space-x-10 mx-10">
                        <Link to="/dashboard" className="text-black hover:text-gray-300 hover:scale-105 inline-block transform duration-200">Home</Link>
                        <Link to="/" className="text-black hover:text-gray-300 hover:scale-105 inline-block transform duration-200">Scholarship</Link>
                        <Link to="/pricing" className="text-black hover:text-gray-300 hover:scale-105 inline-block transform duration-200">Community</Link>
                        <Link to="/contact" className="text-black hover:text-gray-300 hover:scale-105 inline-block transform duration-200">Contact</Link>
                    </div>

                    <div className="flex flex-row">
                        <button onClick={() => { navigate('/profile') }}>
                            <img src={img} className="rounded-full h-9 my-auto object-cover" alt="Profile" />
                        </button>
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-cyan-400 text-xl rounded-full hover:text-cyan-600 transition duration-300"
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className="text-xl" />
                        </button>
                    </div>
                </div>
            </header>

            
        </div>
    );
}

export default Navbar;
