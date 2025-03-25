import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Token expired
        Cookies.remove('authToken');
        navigate('/');
      }
    } catch (error) {
      // Invalid token
      Cookies.remove('authToken');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="home-page">
      <h1>Добро пожаловать!</h1>
      <p>Вы успешно вошли в систему.</p>
    </div>
  );
}

export default HomePage; 

