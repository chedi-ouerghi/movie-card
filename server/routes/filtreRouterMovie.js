

const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const MovieStar = require('../models/MovieStar');
const Stars = require('../models/stars');

// Route pour récupérer les films les mieux notés
router.get('/movies/top-rated', async (req, res) => {
    try {
        const topRatedMovies = await Movie.fetchTopRated();
        res.json(topRatedMovies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des films les mieux notés.' });
    }
});

router.get('/movies/actuality', async (req, res, next) => {
    try {
        const movies = await Movie.fetchMoviesActuality();
        res.json(movies);
    } catch (error) {
        next(error);
    }
});

// Route pour récupérer les meilleures stars
router.get('/stars/best', async (req, res) => {
    try {
        const bestStars = await MovieStar.fetchBestStars();
        res.json(bestStars);
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

// Route pour récupérer les genres de films
router.get('/movies/genres', async (req, res) => {
    try {
        const genres = await Movie.fetchAllGenres();
        res.json(genres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des genres de films.' });
    }
});

// Route pour récupérer les films par genre
router.get('/movies/genre/:genre', async (req, res) => {
    const genre = req.params.genre;
    try {
        const moviesByGenre = await Movie.fetchByGenre(genre);
        res.json(moviesByGenre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des films par genre.' });
    }
});

// Route pour récupérer les durées de films
router.get('/movies/durations', async (req, res) => {
    try {
        const durations = await Movie.fetchAllDurations();
        res.json(durations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des durées de films.' });
    }
});

// Route pour récupérer les films par durée
router.get('/movies/duration/:duration', async (req, res) => {
    const duration = req.params.duration;
    try {
        const moviesByDuration = await Movie.fetchByDuration(duration);
        res.json(moviesByDuration);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des films par durée.' });
    }
});

// Route pour récupérer les origines de films
router.get('/movies/origins', async (req, res) => {
    try {
        const origins = await Movie.fetchAllOrigins();
        res.json(origins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des origines de films.' });
    }
});

// Route pour récupérer les films par origine
router.get('/movies/origin/:origin', async (req, res) => {
    const origin = req.params.origin;
    try {
        const moviesByOrigin = await Movie.fetchByOrigin(origin);
        res.json(moviesByOrigin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des films par origine.' });
    }
});

// Route pour récupérer les âges de films
router.get('/movies/ages', async (req, res) => {
    try {
        const ages = await Movie.fetchAllAges();
        res.json(ages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des âges de films.' });
    }
});

// Route pour récupérer les films par âge
router.get('/movies/age/:age', async (req, res) => {
    const age = req.params.age;
    try {
        const moviesByAge = await Movie.fetchByAge(age);
        res.json(moviesByAge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des films par âge.' });
    }
});


// Route pour rechercher des stars par pays
router.get('/stars/country/:country', async (req, res) => {
    const country = req.params.country;
    try {
        const stars = await Stars.fetchByCountry(country);
        // Filtrer le champ _buf
        const filteredStars = stars.map(star => {
            if (star._buf) {
                delete star._buf;
            }
            return star;
        });
        res.json(filteredStars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des stars par pays.' });
    }
});

module.exports = router;
