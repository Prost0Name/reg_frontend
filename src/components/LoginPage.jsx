import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

function LoginPage() {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    try {
      const endpoint = action === 'login' ? '/auth' : '/reg';
      const response = await fetch(`https://api.vsrs-rs.ru${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(action === 'login' ? 'Успешный вход:' : 'Успешная регистрация:', data);

        if (action === 'login') {
          Cookies.set('authToken', data.token, { expires: 7 });
        }

        navigate('/home');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        console.error(action === 'login' ? 'Ошибка входа' : 'Ошибка регистрации', errorData.error);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Box component="form" onSubmit={(e) => handleSubmit(e, 'login')} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label="Username"
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
            label="Password"
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
  );
}

export default LoginPage; 