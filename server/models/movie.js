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

    static async create(movieData, userId) {
        try {
            const [result, fields] = await db.execute('CALL InsertMovie(?, ?, ?, ?, ?, ?, ?, ?)',
                [userId, movieData.title, movieData.description, movieData.image, movieData.rating, movieData.director, movieData.trailer, movieData.top]);
            return [result, fields];
        } catch (error) {
            throw error;
        }
    }

    static update(id, movie) {
        return db.execute('CALL UpdateMovie(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id, movie.user_id, movie.title, movie.description, movie.image, movie.rating, movie.director, movie.trailer, movie.top]);
    }

    static delete(id) {
        return db.execute('DELETE FROM movies WHERE id = ?', [id]);
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
    console.log('SQL Query:', sql);
    return db.execute(sql);
}


    static fetchTopRatedByGenre(genre) {
        const sql = `
            SELECT movies.*, GROUP_CONCAT(stars.name) AS stars_names
            FROM movies
            LEFT JOIN movies_stars ON movies.id = movies_stars.movie_id
            LEFT JOIN stars ON movies_stars.star_id = stars.id
            WHERE movies.rating >= 5 AND movies.genre = ?
            GROUP BY movies.id
            
        `;

        return db.execute(sql, [genre]);
        }
         
}

module.exports = Movie;
