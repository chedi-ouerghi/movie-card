const express = require('express');
const authenticateToken = require('../Middleware/authenticateToken');
const checkRole = require('../Middleware/checkRole');
const Movie = require('../models/Movie');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const [rows, fields] = await Movie.fetchAll();
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des films.' });
    }
});


router.get('/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const [rows, fields] = await Movie.findById(movieId);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Film non trouvé.' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du film.' });
    }
});

router.get('/top-rated', async (req, res) => {
    try {
        console.log('Avant appel à fetchTopRated');
        const [rows, fields] = await Movie.fetchTopRated();
        console.log('Après appel à fetchTopRated');
        console.log('Résultat:', rows); 
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des films les mieux notés.' });
    }
});

<<<<<<< HEAD
const multer = require('multer');
const path = require('path');

// Configuration de Multer pour stocker les fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(__dirname, '../uploads/movies');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });


// movieRouter.js
router.post('/post', upload.single('image'), authenticateToken, checkRole('admin'), async (req, res) => {
    console.log('Requête reçue pour la création de film');
=======
router.post('/', authenticateToken, checkRole('admin'), async (req, res) => {
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
    const movieData = req.body;
    const userId = req.user.id;

    try {
<<<<<<< HEAD
        const image = req.file ? req.file.filename : null;
        if (!image) {
            return res.status(400).json({ message: 'Image is required' });
        }

        // Assure que toutes les données du film sont fournies
        const { title, description, rating, director, trailer, genre, duration, origin, age, top } = movieData;
        if (!title || !description || !rating || !director || !trailer || !genre || !duration || !origin || !age || top === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        console.log("Données du film envoyées :", { ...movieData, image, userId });

        const [result, fields] = await Movie.create({ ...movieData, image, userId });
        res.status(201).json({ message: 'Film créé avec succès.', movieId: result.insertId });
    } catch (error) {
        console.error('Erreur lors de la création du film:', error);
=======
        const [result, fields] = await Movie.create(movieData, userId);
        res.status(201).json({ message: 'Film créé avec succès.', movieId: result.insertId });
    } catch (error) {
        console.error(error);
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
        res.status(500).json({ message: 'Erreur lors de la création du film.' });
    }
});


<<<<<<< HEAD
// movieRouter.js
router.put('/:id', upload.single('image'), authenticateToken, checkRole('admin'), async (req, res) => {
    const movieId = req.params.id;
    const movieData = req.body;
    const image = req.file ? req.file.filename : null;
    const userId = req.user.id;

    try {

        await Movie.update(movieId, movieData, userId, image);
        res.json({ message: 'Film mis à jour avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du film:', error);
=======
router.put('/:id', authenticateToken, checkRole('admin'), async (req, res) => {
    const movieId = req.params.id;
    const movieData = req.body;

    try {
        await Movie.update(movieId, movieData);
        res.json({ message: 'Film mis à jour avec succès.' });
    } catch (error) {
        console.error(error);
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
        res.status(500).json({ message: 'Erreur lors de la mise à jour du film.' });
    }
});


<<<<<<< HEAD


=======
>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
router.delete('/:id', authenticateToken, checkRole('admin'), async (req, res) => {
    const movieId = req.params.id;

    try {
        await Movie.delete(movieId);
        res.json({ message: 'Film supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du film.' });
    }
});


router.delete('/movies/:movieId/stars/:starId', authenticateToken, checkRole('admin'), async (req, res) => {
    const movieId = req.params.movieId;
    const starId = req.params.starId;

    try {
        await Movie.deleteStar(movieId, starId);
        res.json({ message: 'Association entre le film et la star supprimée avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'association entre le film et la star.' });
    }
});

module.exports = router;
