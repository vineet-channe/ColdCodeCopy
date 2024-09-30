import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    const token = JSON.parse(data)?.token;

    if (token) {
      setIsAuthenticated(true);

      if (location.pathname === '/' || location.pathname === '/Login') {
        navigate('/home', { replace: false });
      }
    }
    else{
      navigate('/Login');
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;