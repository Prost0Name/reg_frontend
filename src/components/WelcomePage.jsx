import React from 'react';
import { AppBar, Toolbar, Button, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      navigate('/'); // Главная
    } else if (newValue === 1) {
      navigate('/competitions'); // Соревнования
    } else {
      navigate('/tasks'); // Задачи
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <AppBar position="static" style={{ backgroundColor: '#B0BEC5', borderRadius: '8px' }} elevation={0}>
        <Toolbar>
          <Tabs onChange={handleTabChange} textColor="inherit">
            <Tab label="Главная" style={{ color: '#FFFFFF', fontWeight: 'bold' }} />
            <Tab label="Соревнования" style={{ color: '#FFFFFF', fontWeight: 'bold' }} />
            <Tab label="Задачи" style={{ color: '#FFFFFF', fontWeight: 'bold' }} />
          </Tabs>
          <Button color="inherit" onClick={() => navigate('/enter')} style={{ marginLeft: 'auto', color: '#FFFFFF', fontWeight: 'bold' }}>
            Войти
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ textAlign: 'center', marginTop: '20px', color: '#2C3E50' }}>
        <h1 style={{ color: '#2C3E50' }}>Добро пожаловать в наше приложение!</h1>
        <p style={{ color: '#34495E' }}>Пожалуйста, перейдите на страницу входа, чтобы продолжить.</p>
      </div>
    </div>
  );
}

export default WelcomePage; 