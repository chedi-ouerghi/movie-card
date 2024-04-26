const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const checkRole = require('../middleware/checkRole');
const authenticateToken = require('../Middleware/authenticateToken');


// router.use(authenticateToken);

// Get all movies
router.get('/getAll-Movie', async (req, res) => {
    console.log('Requête reçue pour getAll-Movie');  // Ajoutez ce log
    try {
        const [movies] = await Movie.fetchAll();
        res.json(movies);
    } catch (err) {
        console.error('Erreur dans getAll-Movie:', err);  // Ajoutez ce log
        res.status(500).json({ message: 'Server error' });
    }
});



// Get movie by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [movie] = await Movie.findById(id);
        if (!movie[0]) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie[0]);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create movie (admin only)
router.post('/', authenticateToken, checkRole('admin'), async (req, res) => {
    try {
        console.log('Création d\'un film par:', req.user);

        const result = await Movie.create(req.body, req.user.id);
        console.log('Film créé:', result);

        res.json({ message: 'Movie created', id: result[0].insertId });
    } catch (err) {
        console.error('Erreur lors de la création du film:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update movie by id (admin only)
router.put('/:id',authenticateToken, checkRole('admin'), async (req, res) => {
    const { id } = req.params;
    try {
        await Movie.update(id, req.body);
        console.log('Film mis à jour avec succès');
        res.json({ message: 'Movie updated' });
    } catch (err) {
        console.error('Erreur lors de la mise à jour du film:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


// Delete movie by id (admin only)
router.delete('/:id',authenticateToken, checkRole('admin'), async (req, res) => {
    const { id } = req.params;
    try {
        await Movie.delete(id);
        console.log('Film supprimé avec succès');
        res.json({ message: 'Movie deleted' });
    } catch (err) {
        console.error('Erreur lors de la suppression du film:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
