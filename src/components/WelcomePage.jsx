import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setMobile] = useState(false);

  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      navigate('/'); // Главная
    } else if (newValue === 1) {
      navigate('/competitions'); // Соревнования
    } else {
      navigate('/tasks'); // Задачи
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 600); // Установите порог для мобильного устройства
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Проверяем размер при загрузке
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <AppBar position="static" style={{ backgroundColor: '#B0BEC5', borderRadius: '8px' }} elevation={0}>
        <Toolbar>
          {isMobile ? (
            <>
              <Button onClick={toggleDrawer(true)} style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                Меню
              </Button>
              <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <div style={{ width: 250, display: 'flex', flexDirection: 'column', padding: '10px' }}>
                  <Button onClick={() => { navigate('/'); setDrawerOpen(false); }} style={{ color: '#000', marginBottom: '10px' }}>Главная</Button>
                  <Button onClick={() => { navigate('/competitions'); setDrawerOpen(false); }} style={{ color: '#000', marginBottom: '10px' }}>Соревнования</Button>
                  <Button onClick={() => { navigate('/tasks'); setDrawerOpen(false); }} style={{ color: '#000' }}>Задачи</Button>
                </div>
              </Drawer>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button onClick={() => navigate('/')} style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Главная</Button>
              <Button onClick={() => navigate('/competitions')} style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Соревнования</Button>
              <Button onClick={() => navigate('/tasks')} style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Задачи</Button>
            </div>
          )}
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