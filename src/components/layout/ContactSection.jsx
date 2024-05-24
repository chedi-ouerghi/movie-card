import React, { useState } from "react";
import './contactstyle.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Récupération du token depuis le localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour envoyer un message.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5320/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('E-mail envoyé et enregistré avec succès !');
      } else {
        alert(`Erreur: ${result.error}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      alert('Une erreur est survenue lors de l\'envoi du formulaire.');
    }
  };

  return (
    <div className="contact">
      <h2 className="contact-title">
        Need Assistance? Let's Chat!
      </h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <span className="input-name">Name:</span>
          <input
            type="text"
            name="name"
            id="name"
            className="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          <span className="input-name">Email address:</span>
          <input
            type="email"
            name="email"
            id="email"
            className="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="message">
          <span className="input-name">Tell about your project:</span>
          <textarea
            name="message"
            id="message"
            className="project-info"
            value={formData.message}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="btn send-btn">Send</button>
      </form>
    </div>
  );
};

export default ContactSection;
