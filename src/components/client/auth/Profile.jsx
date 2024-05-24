// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useAuth } from '../../../services/AuthContext';
=======
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
<<<<<<< HEAD
  const { token, role } = useAuth();

  useEffect(() => {
    if (!token) {
=======
  const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage

  useEffect(() => {
    if (!token) {
      // Rediriger vers la page de connexion si aucun token n'est présent
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
      navigate('/login');
    } else {
      const fetchProfile = async () => {
        try {
<<<<<<< HEAD
          const response = await axios.get('http://localhost:5320/api/auth/profile', {
=======
          const response = await axios.get('http://localhost:5320/api/auth/profile/:id', {
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
<<<<<<< HEAD
=======

>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
          setUser(response.data);
        } catch (err) {
          setError(err.response.data.message);
        }
      };
<<<<<<< HEAD
=======

>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
      fetchProfile();
    }
  }, [token, navigate]);

  const handleModifyProfile = () => {
<<<<<<< HEAD
    if (role === 'admin') {
      navigate('/admin');
    } else {
      setError('Vous n\'avez pas l\'autorisation d\'accéder à cette page.');
    }
=======
    navigate('/admin/');
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile_container">
      <div className="profile-card">
        <h2 className="profile-title">Profile</h2>
        {error && <div className="error">{error}</div>}
        <div className="profile-info">
          <strong className="profile-label">Nom: </strong>
          <span className="profile-value">{user.nom}</span>
        </div>
        <div className="profile-info">
          <strong className="profile-label">Prénom: </strong>
          <span className="profile-value">{user.prenom}</span>
        </div>
        <div className="profile-info">
          <strong className="profile-label">Email: </strong>
          <span className="profile-value">{user.email}</span>
        </div>
        <div className="profile-info">
          <strong className="profile-label">Téléphone: </strong>
          <span className="profile-value">{user.telephone}</span>
        </div>
        <div className="profile-info">
          <button className="modifier-profile" onClick={handleModifyProfile}>
            List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
