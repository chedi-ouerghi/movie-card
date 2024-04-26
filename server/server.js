const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const moviesRoutes = require('./routes/movieRouter');
const authRoutes = require('./routes/authRouter');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/movies', moviesRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
