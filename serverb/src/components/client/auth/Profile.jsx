// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../services/AuthContext';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token, role } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      const fetchProfile = async () => {
        try {
          const response = await axios.get('http://localhost:5320/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (err) {
          setError(err.response.data.message);
        }
      };
      fetchProfile();
    }
  }, [token, navigate]);

  const handleModifyProfile = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      setError('Vous n\'avez pas l\'autorisation d\'accéder à cette page.');
    }
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
