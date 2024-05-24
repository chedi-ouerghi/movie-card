import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../auth/auth.css"

const Register = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  // Supprimez la variable setRole si elle n'est pas utilisée
  // const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5320/api/auth/register', {
        nom,
        prenom,
        email,
        password,
        telephone,
        // role,
      });
      
      alert('Inscription réussie !');
      navigate('/login');

    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div style={{height:'93vh'}}>
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      {error && <div className="error">{error}</div>}
      <form id='register-form' onSubmit={handleSubmit}>
        <div id='div1_form_register'>
          <label id='label_register'>Nom:</label>
          <input id='input_register' type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div id='div1_form_register'>
          <label id='label_register'>Prénom:</label>
          <input id='input_register' type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
        </div>
        <div id='div1_form_register'>
          <label id='label_register'>Email:</label>
          <input id='input_register' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div id='div1_form_register'>
          <label id='label_register'>Password:</label>
          <input id='input_register' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div id='div1_form_register'>
          <label id='label_register'>Téléphone:</label>
          <input id='input_register' type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        </div>
        <button id='button_register' type="submit">Register</button>
      </form>
      <span className='span_register'>
        Vous avez déjà un compte ? 
        <Link to="/login" style={{ textDecoration: "underline", marginLeft: "5px" }}>Connectez-vous</Link>
      </span>
    </div>
  );
};

export default Register;
