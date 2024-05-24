// routes/chatRouter.js
const express = require('express');
const pool = require('../config/config');
const openai = require('../config/openai');
const { default: axios } = require('axios');
const router = express.Router();


router.post('/send', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.createChatCompletion({
            model: "text-davinci-004",
            messages: [{ role: "user", content: message }],
        });

        const botResponse = response.data.choices[0].message.content;

        res.json({ userMessage: message, botResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
    


router.get('/top-movies', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
            params: {
                api_key: process.env.TMDB_API_KEY
            }
        });

        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
