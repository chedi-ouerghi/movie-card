<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { sendEmail } = require('../config/nodemailerConfig');
=======

const express = require('express');
const router = express.Router();
const transporter = require('../config/nodemailerConfig');
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
const Contact = require('../models/Contact'); 
const authenticateToken = require('../Middleware/authenticateToken');
const checkRole = require('../Middleware/checkRole');

<<<<<<< HEAD
router.get('/contacts', async (req, res) => {
  try {
    const [contacts] = await Contact.getAll();
=======

router.get('/contacts', async (req, res) => {
  try {
    
    const contacts = await Contact.find();
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Erreur lors de la récupération des e-mails de contact :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des e-mails de contact.' });
  }
});

<<<<<<< HEAD
router.get('/contact/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: 'E-mail de contact non trouvé.' });
    }
=======

router.get('/contact/:id',authenticateToken, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return res.status(404).json({ error: 'E-mail de contact non trouvé.' });
    }

>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
    res.status(200).json(contact);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'e-mail de contact :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'e-mail de contact.' });
  }
});

<<<<<<< HEAD
router.post('/send', authenticateToken, checkRole('user'), async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Envoyer l'email
    sendEmail(name, email, message, res);

    // Enregistrer dans la base de données
    await Contact.create({ name, email, message });
=======

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
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8

    res.status(200).json({ message: 'E-mail envoyé et enregistré avec succès !' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail de contact :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'envoi de l\'e-mail de contact.' });
  }
});

module.exports = router;
