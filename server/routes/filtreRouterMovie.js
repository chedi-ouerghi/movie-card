const express = require('express');
const Movie = require('../models/Movie');
const MovieStar = require('../models/MovieStar');

const router = express.Router();


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

router.get('/best-stars', async (req, res) => {
    try {
        const stars = await MovieStar.fetchBestStars();
        res.json(stars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des meilleures stars.' });
    }
});

router.get('/stars/top', async (req, res) => {
    try {
        const stars = await MovieStar.fetchstarsByNumberMovies();
        res.status(200).json(stars);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des stars', error: error.message });
    }
});


module.exports = router;
