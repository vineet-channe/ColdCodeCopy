import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <nav className="fixed w-full z-10 bg-black">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-white text-xl font-bold sm:block">Sarthi</span>
                </div>
                <div className="sm:hidden md:flex space-x-10 mx-10">
                    <Link to="/dashboard" className="text-white hover:text-gray-300 hover:scale-105 inline-block transform duration-200" >Home</Link>
                    <Link to="/about" className="text-white hover:text-gray-300 hover:scale-105 inline-block transform duration-200" >About Us</Link>
                    <Link to="/pricing" className="text-white hover:text-gray-300 hover:scale-105 inline-block transform duration-200" >Pricing</Link>
                    <Link to="/contact" className="text-white hover:text-gray-300 hover:scale-105 inline-block transform duration-200" >Contact</Link>
                </div>
                <div className="hidden sm:block">
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-4 bg-black p-4 h-screen md:hidden w-screen">
                    <Link to="/dashboard" className="block px-4 py-2 text-white hover:text-gray-300" onClick={handleLinkClick}>Home</Link>
                    <Link to="/about" className="block px-4 py-2 text-white hover:text-gray-300" onClick={handleLinkClick}>About Us</Link>
                    <Link to="/pricing" className="block px-4 py-2 text-white hover:text-gray-300" onClick={handleLinkClick}>Pricing</Link>
                    <Link to="/contact" className="block px-4 py-2 text-white hover:text-gray-300" onClick={handleLinkClick}>Contact</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
