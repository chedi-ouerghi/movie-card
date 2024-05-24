const express = require('express');
const router = express.Router();
const Auth = require('../models/auth');
const dotenv = require('dotenv');
const authenticateToken = require('../Middleware/authenticateToken');


dotenv.config();


router.post('/register', async (req, res) => {
    try {
        const user = req.body;
        const newUser = await Auth.create(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        
        const user = await Auth.findByEmailAndPassword(email, password);
        
        if (!user) {
            console.log('Email ou mot de passe incorrect');
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        console.log('Connexion réussie');
        
        
        const token = Auth.generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        console.log('Erreur lors de la connexion :', error.message);
        res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
    }
});


router.get('/profile/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.user; 
        const user = await Auth.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du profil', error: error.message });
    }
});



router.get('/users', authenticateToken, async (req, res) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return res.status(403).json({ message: 'Accès refusé' });
        }

        const users = await Auth.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: error.message });
    }
});

module.exports = router;
