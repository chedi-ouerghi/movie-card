// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, message } from 'antd';
import "../auth/auth.css";
<<<<<<< HEAD
import { useAuth } from '../../../services/AuthContext';

const Login = () => {
=======

const Login = ({ setToken }) => {
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
<<<<<<< HEAD
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

=======
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
    try {
      const response = await axios.post('http://localhost:5320/api/auth/login', {
        email,
        password,
      });

      const tokenValue = response.data.token;
<<<<<<< HEAD
      login(tokenValue);
      message.success('Login successful');
      navigate('/profile');
=======
      setToken(tokenValue);
      message.success('Login successful');
      localStorage.setItem('token', tokenValue);
      navigate('/profile');
      window.location.reload(); // Rafraîchissement de la page après la navigation
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div style={{ height: '93vh' }}>
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      {error && <div className="error">{error}</div>}
<<<<<<< HEAD
      <form onSubmit={handleSubmit} className='form-login'>
=======
      <form onSubmit={handleSubmit}>
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
        <div className='div1_form'>
          <label className='label_login'>Email:</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='div1_form'>
          <label className='label_login'>Password:</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <div className="social">
          <div className="go">
            <i className="fab fa-google" /> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook" /> Facebook
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
