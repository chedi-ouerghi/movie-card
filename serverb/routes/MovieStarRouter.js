const express = require('express');
const router = express.Router();
const MovieStar = require('../models/MovieStar');
const authenticateToken = require('../Middleware/authenticateToken');
const checkRole = require('../Middleware/checkRole');


// router.get('/', async (req, res) => {
//     try {
//         const movieStars = await MovieStar.fetchAll();
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

router.get('/fetchTitleAndName', async (req, res) => {
    try {
        const results = await MovieStar.fetchTitleAndName();
        res.json(results);
    } catch (error) {
        console.error("Error fetching title and name:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/', authenticateToken, checkRole('admin'), async (req, res) => {
    const { movie_id, star_id } = req.body;

    console.log('Received MovieStar data:', { movie_id, star_id });

    if (!star_id) {
        console.error('Invalid star_id:', star_id);
        return res.status(400).json({ error: "star_id is required" });
    }

    const movieStarData = {
        movie_id,
        star_id: Array.isArray(star_id) ? star_id[0] : star_id
    };

    try {
        console.log('Creating MovieStar association:', movieStarData);
        await MovieStar.create(movieStarData);
        console.log('MovieStar association created successfully');
        res.json({ message: 'MovieStar association created successfully' });
    } catch (error) {
        console.error('Error creating MovieStar association:', error.message);
        res.status(500).json({ error: error.message });
    }
});







router.delete('/movie/:id', authenticateToken, checkRole('admin'), async (req, res) => {
    const movieId = req.params.id;
    try {
        await MovieStar.deleteByMovieId(movieId);
        res.json({ message: 'MovieStar associations for the movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/star/:id', authenticateToken, checkRole('admin'), async (req, res) => {
    const starId = req.params.id;
    try {
        await MovieStar.deleteByStarId(starId);
        res.json({ message: 'MovieStar associations for the star deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:movieId/star/:starId', authenticateToken, checkRole('admin'), async (req, res) => {
    const movieId = req.params.movieId;
    const starId = req.params.starId;
    try {
        await MovieStar.deleteByMovieAndStarId(movieId, starId);
        res.json({ message: 'MovieStar association deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
