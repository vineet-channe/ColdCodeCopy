import {React,useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import RefreshHandler from './Utilities/RefreshHandler';
import Player from './components/Player';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="699732260476-g2ebebevveek24fnh97or4v894mog4ca.apps.googleusercontent.com">
        <Login/>
      </GoogleOAuthProvider>
    );
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : Navigate('/login');
  };

  return (
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>} />} />
        {/* <Route path="/community" element={<PrivateRoute element={<Community/>} />} />
        <Route path="/scholarship" element={<PrivateRoute element={<Scholarship/>} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile/>} />} /> */}
        
        <Route path="*" element={<NotFound/>} />
        <Route path="/video/:videoId" element={<PrivateRoute element={<Player/>} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
