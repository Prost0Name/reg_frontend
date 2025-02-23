import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
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

