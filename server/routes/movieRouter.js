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



router.post('/', authenticateToken, checkRole('admin'), async (req, res) => {
    const movieData = req.body;
    const userId = req.user.id;

    try {
        const [result, fields] = await Movie.create(movieData, userId);
        res.status(201).json({ message: 'Film créé avec succès.', movieId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du film.' });
    }
});


router.put('/:id', authenticateToken, checkRole('admin'), async (req, res) => {
    const movieId = req.params.id;
    const movieData = req.body;

    try {
        await Movie.update(movieId, movieData);
        res.json({ message: 'Film mis à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du film.' });
    }
});


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
