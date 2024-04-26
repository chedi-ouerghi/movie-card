// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./auth.css"

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const navigate = useNavigate();
  
     const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5320/api/auth/login', {
        email,
        password,
      });

      const tokenValue = response.data.token;
        setToken(tokenValue);

      localStorage.setItem('token', tokenValue);
      navigate('/profile');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
      <>
          <div className="background">
    <div className="shape" />
    <div className="shape" />
  </div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className='div1_form'>
          <label className='label_login'>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='div1_form'>
          <label className='label_login'>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button  type="submit">Login</button>
       <div className="social">
      <div className="go">
        <i className="fab fa-google" /> Google
      </div>
      <div className="fb">
        <i className="fab fa-facebook" /> Facebook
      </div>
    </div>
          </form>
    </>
  );
};

export default Login;
