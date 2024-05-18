
const express = require('express');
const router = express.Router();
const transporter = require('../config/nodemailerConfig');
const Contact = require('../models/Contact'); 
const authenticateToken = require('../Middleware/authenticateToken');
const checkRole = require('../Middleware/checkRole');


router.get('/contacts', async (req, res) => {
  try {
    
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Erreur lors de la récupération des e-mails de contact :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des e-mails de contact.' });
  }
});


router.get('/contact/:id',authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return res.status(404).json({ error: 'E-mail de contact non trouvé.' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'e-mail de contact :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'e-mail de contact.' });
  }
});


router.post('/send',authenticateToken, checkRole('admin'), async (req, res) => {
  const { name, email, message } = req.body;

  try {
    
    await transporter.sendMail({
      from: 'votre_adresse@gmail.com', 
      to: 'chediouerghi88@gmail.com', 
      subject: `Nouveau message de ${name}`,
      text: `${message}\n\n---\nEmail de l'expéditeur : ${email}`,
    });

    
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: 'E-mail envoyé et enregistré avec succès !' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail de contact :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'envoi de l\'e-mail de contact.' });
  }
});

module.exports = router;
