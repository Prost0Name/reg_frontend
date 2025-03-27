import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Container, Box, Typography, Drawer } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function AuthPage() {
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(10);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get('status');

    switch (status) {
      case 'success':
        setMessage('Регистрация успешно подтверждена');
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      case 'token_invalid':
        setMessage('Время на подтверждение вышло или токен недействителен');
        break;
      case 'unknown_error':
        setMessage('Неизвестная ошибка');
        break;
      default:
        setMessage('Неизвестный статус');
        break;
    }
  }, [location, navigate]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
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
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', textAlign: 'center' }}>
            {message}
          </Typography>
          {message === 'Регистрация успешно подтверждена' && (
            <Typography sx={{ mt: 2, fontSize: '1.2rem', fontWeight: 'medium' }}>
              Вы будете перенаправлены на главную страницу через {countdown} секунд.
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default AuthPage;
