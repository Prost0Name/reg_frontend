import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, TextField, Container, Box, Typography, Alert, Tabs, Tab, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function AuthPage() {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.vsrs-rs.ru/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        Cookies.set('authToken', data.token, { expires: 7 });
        navigate('/home');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
            <Tabs value={tabValue} onChange={handleTabChange} textColor="inherit">
              <Tab label="Главная" style={{ color: '#FFFFFF', fontWeight: 'bold' }} />
              <Tab label="Соревнования" style={{ color: '#FFFFFF', fontWeight: 'bold' }} />
              <Tab label="Задачи" style={{ color: '#FFFFFF', fontWeight: 'bold' }} />
            </Tabs>
          )}
          <Button color="inherit" onClick={() => navigate('/enter')} style={{ marginLeft: 'auto', color: '#FFFFFF', fontWeight: 'bold' }}>
            Войти
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoComplete="login"
              autoFocus
              value={formData.login}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={(e) => handleSubmit(e, 'register')}
            >
              Регистрация
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default AuthPage; 