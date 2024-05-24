const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const moviesRoutes = require('./routes/movieRouter');
const authRoutes = require('./routes/authRouter');
const starsRouter = require('./routes/starsRouter');
const MovieStarRouter = require('./routes/MovieStarRouter');
const filtreRouterMovie = require('./routes/filtreRouterMovie');
const contactRouter = require('./routes/contactRouter');
// const chatRouter = require('./routes/chatRouter');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/movies', moviesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stars', starsRouter);
app.use('/api/movie-stars', MovieStarRouter);
app.use('/filtre', filtreRouterMovie);
app.use('/contact', contactRouter);
// app.use('/api/chat', chatRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
