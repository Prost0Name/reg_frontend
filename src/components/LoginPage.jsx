import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LoginPage() {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

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
          console.log('Полученный токен:', data.token);
        }

        navigate('/home');
      } else {
        console.error(action === 'login' ? 'Ошибка входа' : 'Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={(e) => handleSubmit(e, 'login')}>
        <div>
          <label htmlFor="login">Username:</label>
          <input 
            type="text" 
            id="login" 
            name="login" 
            value={formData.login}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <button type="submit">Войти</button>
          <button type="button" onClick={(e) => handleSubmit(e, 'register')}>Регистрация</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage; 