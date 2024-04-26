
const db = require('../config/config');
class Movie {
    static fetchAll() {
        return db.execute('SELECT * FROM movies ORDER BY id');
    }

    static findById(id) {
        return db.execute('SELECT * FROM movies WHERE id = ?', [id]);
    }

static create(movie, userId) {
    const { title, director, stars, description, image, trailer, rating } = movie;

    const starsString = Array.isArray(stars) ? stars.join(',') : '';

    return db.execute(
        'INSERT INTO movies (user_id, title, director, stars, description, image, trailer, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, title, director, starsString, description, image, trailer, rating]
    );
}



    static update(id, movie) {
        const { title, director, stars, description, image, trailer, rating } = movie;
        const starsString = stars.join(',');
        return db.execute(
            'UPDATE movies SET title=?, director=?, stars=?, description=?, image=?, trailer=?, rating=? WHERE id=?',
            [title, director, starsString, description, image, trailer, rating, id]
        );
    }

    static delete(id) {
        return db.execute('DELETE FROM movies WHERE id = ?', [id]);
    }
}

module.exports = Movie;
