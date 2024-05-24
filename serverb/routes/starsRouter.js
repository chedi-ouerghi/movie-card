const express = require('express');
const Stars = require('../models/stars');
const authenticateToken = require('../Middleware/authenticateToken');
const checkRole = require('../Middleware/checkRole');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows, fields] = await Stars.fetchAll();
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des stars.' });
    }
});

router.get('/:id', async (req, res) => {
    const starId = req.params.id;
    try {
        const [rows, fields] = await Stars.findById(starId);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Star non trouvée.' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la star.' });
    }
});


const multer = require('multer');
const path = require('path');

// Configuration de Multer pour stocker les fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(__dirname, '../uploads/stars');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });


router.post('/', authenticateToken, checkRole('admin'), upload.single('image'), async (req, res) => {
    const starData = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const { name, date_of_birth, country, description } = starData;
        if (!name || !date_of_birth || !country || !image || !description) {
            return res.status(400).json({ message: 'Veuillez fournir toutes les informations nécessaires pour créer une star.' });
        }

        const formattedDateOfBirth = new Date(date_of_birth).toISOString().split('T')[0];
        const [result, fields] = await Stars.create({ ...starData, image, date_of_birth: formattedDateOfBirth });
        res.status(201).json({ message: 'Star créée avec succès.', starId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la star.' });
    }
});

router.put('/:id', authenticateToken, checkRole('admin'), upload.single('image'), async (req, res) => {
    const starId = req.params.id;
    const starData = req.body;
    const image = req.file ? req.file.filename : null;
    const userId = req.user.id;

    try {
        if (image) {
            starData.image = image;
        }

        console.log("Données du star envoyées :", { ...starData, image, userId });

        await Stars.update(starId, starData, userId);
        res.json({ message: 'Star mise à jour avec succès.' });

        console.log("Données du star reçues :", { ...starData, image, userId });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du star:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la star.' });
    }
});

router.delete('/:id', authenticateToken, checkRole('admin'), async (req, res) => {
    const starId = req.params.id;

    try {
        await Stars.delete(starId);
        res.json({ message: 'Star supprimée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la star.' });
    }
});

module.exports = router;
