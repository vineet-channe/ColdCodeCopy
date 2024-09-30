import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const result = await axios.get(`http://localhost:5000/api/googleauth/login?code=${authResult['code']}`);
        const { email, name, image } = result.data.user;
        const token = result.data.token;

        const obj = { email, name, image, token };
        
        localStorage.setItem('user-info', JSON.stringify(obj));

        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error while requesting google code: ', err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  });

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-500 flex flex-col justify-between">
      <nav className="flex justify-between items-center p-6">
     </nav>

      <div className="flex flex-col items-center text-center space-y-6">
        <h2 className="text-white text-6xl font-extrabold">Welcome to Sarthi</h2>
        <p className="text-white text-lg max-w-2xl">
          Your learning companion, tailored for the evolving world.
        </p>
        <button
          onClick={googleLogin}
          className="px-8 py-3 bg-white text-blue-500 font-bold text-lg rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </button>
      </div>

      <footer className="text-center text-white py-6">
        <p>© 2024 Sarthi. Empowering education for everyone.</p>
      </footer>
    </div>
  );
}

export default Login;
