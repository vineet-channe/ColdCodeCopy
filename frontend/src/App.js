import {React,useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import RefreshHandler from './Utilities/RefreshHandler';
import Player from './components/Player';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import UserProfile from './components/Profile';
import Scholarship from './components/Scholarship';
import VideoCall from './components/VideoPage';
import Home from './components/Home';
import CommunityForum from './components/Community';
import Conference from './components/Conference';
import Query from "./components/Query";
import IncomeCert from "./components/IncomeCert";
import Mentorship from "./components/Mentorship";
import About from "./components/About";

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
        <Route path="/ytdashboard" element={<PrivateRoute element={<Dashboard/>} />} />
        <Route path="/community" element={<PrivateRoute element={<CommunityForum/>} />} />
        <Route path="/scholarship" element={<PrivateRoute element={<Scholarship/>} />} />
        <Route path="/profile" element={<PrivateRoute element={<UserProfile/>} />} />
        <Route path="/call/:callid" element={<PrivateRoute element={<Conference/>} />} />
        <Route path="/query" element={<Query/>}></Route>
        <Route path="/query/incomecertificate" element={<IncomeCert/>}></Route>
        <Route path="/mentorship" element={<Mentorship />}></Route>
        <Route path="/aboutus" element={<About />}></Route>
        <Route path="*" element={<NotFound/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/video/:videoId" element={<PrivateRoute element={<Player/>} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
