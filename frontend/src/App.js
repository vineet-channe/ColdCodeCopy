import {React,useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import PageNotFound from './PageNotFound';
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
      <GoogleOAuthProvider clientId="16519196980-moedlvne2cbumbt5pjj867r3jvs89qmh.apps.googleusercontent.com">
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
        <Route path="*" element={<NotFound/>} />
        <Route path="/video/:videoId" element={<PrivateRoute element={<Player/>} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
