const db = require('../config/config');

class MovieStar {
    static fetchAll() {
        return db.execute('SELECT * FROM movie_star');
    }

static async fetchTitleAndName() {
    try {
        const [rows] = await db.execute(`
            SELECT m.title AS movie_title, s.name AS star_name
            FROM movies m
            JOIN movie_star ms ON m.id = ms.movie_id
            JOIN stars s ON ms.star_id = s.id;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
    }
        static async fetchstarsByNumberMovies() {
        try {
            const [rows] = await db.execute(`
 SELECT s.id, s.name, GROUP_CONCAT(m.title SEPARATOR ', ') AS title_movies, COUNT(ms.movie_id) AS num_movies
FROM stars s
JOIN movie_star ms ON s.id = ms.star_id
JOIN movies m ON ms.movie_id = m.id
GROUP BY s.id, s.name
ORDER BY num_movies DESC;
            `);
            return rows;
            
        } catch (error)
        {
            throw error;
        }
    }

 static async fetchBestStars() {
        try {
            const [rows] = await db.execute(`
SELECT s.*, 
       COUNT(ms.star_id) AS movie_count, 
       GROUP_CONCAT(m.title SEPARATOR ', ') AS movie_titles
FROM stars s
JOIN movie_star ms ON s.id = ms.star_id
JOIN movies m ON ms.movie_id = m.id
GROUP BY s.id
HAVING COUNT(ms.star_id) >= 3;

            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }


    

static create(movieStarData) {
    return db.execute('INSERT INTO movie_star (movie_id, star_id, date_insert) VALUES (?, ?, ?)', [movieStarData.movie_id, movieStarData.star_id, new Date()]);
}

    
    static deleteByMovieId(movieId) {
        return db.execute('DELETE FROM movie_star WHERE movie_id = ?', [movieId]);
    }

    static deleteByStarId(starId) {
        return db.execute('DELETE FROM movie_star WHERE star_id = ?', [starId]);
    }

    static deleteByMovieAndStarId(movieId, starId) {
        return db.execute('DELETE FROM movie_star WHERE movie_id = ? AND star_id = ?', [movieId, starId]);
    }
}

module.exports = MovieStar;