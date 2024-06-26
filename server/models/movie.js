const db = require('../config/config');

class Movie {
    static fetchAll() {
        return db.execute('SELECT * FROM movieswithstars ');
    }

    static findById(id) {
        const sql = `
            SELECT movies.*, GROUP_CONCAT(stars.name) AS stars_names
            FROM movies 
            LEFT JOIN movie_star ON movies.id = movie_star.movie_id
            LEFT JOIN stars ON movie_star.star_id = stars.id
            WHERE movies.id = ?
            GROUP BY movies.id
        `;
        return db.execute(sql, [id]);
    }
<<<<<<< HEAD
// Movie.js
static async create(movieData) {
    try {
        const { title, description, image, rating, director, trailer, top, genre, duration, origin, age } = movieData;

        if (!image) {
            throw new Error("Image is required");
        }

        const topValue = top === 'true' || top === '1' ? 1 : 0;

        // Assure que toutes les valeurs sont définies
        const values = [title, description, image, rating, director, trailer, topValue, genre, duration, origin, age];
        for (const value of values) {
            if (value === undefined) {
                throw new Error("All parameters must be provided");
            }
        }

        const [result, fields] = await db.execute('CALL InsertMovie(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [movieData.userId, title, description, image, rating, director, trailer, topValue, genre, duration, origin, age]);

        return [result, fields];
    } catch (error) {
        throw error;
    }
}


// Movie.js
static async update(id, movieData, userId, image) {
    try {
        const { title, description, rating, director, trailer, top, genre, duration, origin, age } = movieData;

        const imageValue = image || null;
        const topValue = top === 'true' || top === '1' ? 1 : 0;

        const [result, fields] = await db.execute('CALL UpdateMovie(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [id, userId, title, description, imageValue, rating, director, trailer, topValue, genre, duration, origin, age]);

        return [result, fields];
    } catch (error) {
        throw error;
    }
}



=======

    static async create(movieData, userId) {
        try {
            const { title, description, image, rating, director, trailer, top, genre, duration, origin, age } = movieData;
            const [result, fields] = await db.execute('CALL InsertMovie(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [userId, title, description, image, rating, director, trailer, top, genre, duration, origin, age]);
            return [result, fields];
        } catch (error) {
            throw error;
        }
    }

static update(id, movie) {
    const { user_id, title, description, image, rating, director, trailer, top, genre, duration, origin, age } = movie;
    const values = [id, user_id, title, description, image, rating, director, trailer, top, genre, duration, origin, age];
    const definedValues = values.map(value => (value !== undefined ? value : null));

    return db.execute('CALL UpdateMovie(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', definedValues);
}


>>>>>>> fa07b12a2bacc6173ab53dcaf157def6a92faca8
    static delete(id) {
        return db.execute('DELETE FROM movies WHERE id = ?', [id]);
    }

static fetchMoviesActuality() {
    const sql = `
        SELECT movies.*, GROUP_CONCAT(stars.name) AS stars_names
        FROM movies
        LEFT JOIN movie_star ON movies.id = movie_star.movie_id
        LEFT JOIN stars ON movie_star.star_id = stars.id
        WHERE movies.top = 1
        GROUP BY movies.id
    `;
    return db.execute(sql)
        .then(([rows]) => {
            return rows.map(row => {
                const { _buf, ...data } = row;
                return data;
            });
        });
}


    static fetchTopRated() {
        const sql = `
            SELECT movies.*, GROUP_CONCAT(stars.name) AS stars_names
            FROM movies
            LEFT JOIN movie_star ON movies.id = movie_star.movie_id
            LEFT JOIN stars ON movie_star.star_id = stars.id
            WHERE movies.rating >= 5
            GROUP BY movies.id
        `;
       return db.execute(sql)
        .then(([rows]) => {
            return rows.map(row => {
                const { _buf, ...data } = row;
                return data;
            });
        });
}

    static async fetchAllGenres() {
        try {
            const [rows] = await db.execute('SELECT DISTINCT genre FROM movies');
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async fetchAllDurations() {
        try {
            const [rows] = await db.execute('SELECT DISTINCT duration FROM movies');
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async fetchAllOrigins() {
        try {
            const [rows] = await db.execute('SELECT DISTINCT origin FROM movies');
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async fetchAllAges() {
        try {
            const [rows] = await db.execute('SELECT DISTINCT age FROM movies');
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static fetchByGenre(genre) {
        const sql = `
            SELECT movies.*, GROUP_CONCAT(stars.name) AS stars_names
            FROM movies
            LEFT JOIN movie_star ON movies.id = movie_star.movie_id
            LEFT JOIN stars ON movie_star.star_id = stars.id
            WHERE movies.genre = ?
            GROUP BY movies.id
        `;

        return db.execute(sql, [genre])
            .then(([rows]) => {
                return rows.map(row => {
                    const { _buf, ...data } = row;
                    return data;
                });
            });
    }

    static fetchByDuration(duration) {
        const sql = `
            SELECT movies.*, GROUP_CONCAT(stars.name) AS stars_names
            FROM movies
            LEFT JOIN movie_star ON movies.id = movie_star.movie_id
            LEFT JOIN stars ON movie_star.star_id = stars.id
            WHERE movies.duration = ?
            GROUP BY movies.id
        `;
        return db.execute(sql, [duration])
            .then(([rows]) => {
                return rows.map(row => {
                    const { _buf, ...data } = row;
                    return data;
                });
            });
    }

    static fetchByOrigin(origin) {
        const sql = `
            SELECT movies.*, GROUP_CONCAT(stars.name) AS stars_names
            FROM movies
            LEFT JOIN movie_star ON movies.id = movie_star.movie_id
            LEFT JOIN stars ON movie_star.star_id = stars.id
            WHERE movies.origin = ?
            GROUP BY movies.id
        `;
        return db.execute(sql, [origin])
            .then(([rows]) => {
                return rows.map(row => {
                    const { _buf, ...data } = row;
                    return data;
                });
            });
    }

    static fetchByAge(age) {
        const sql = `
            SELECT movies.*, GROUP_CONCAT(stars.name) AS stars_names
            FROM movies
            LEFT JOIN movie_star ON movies.id = movie_star.movie_id
            LEFT JOIN stars ON movie_star.star_id = stars.id
            WHERE movies.age = ?
            GROUP BY movies.id
        `;
        return db.execute(sql, [age])
            .then(([rows]) => {
                return rows.map(row => {
                    const { _buf, ...data } = row;
                    return data;
                });
            });
    }
}

module.exports = Movie;
