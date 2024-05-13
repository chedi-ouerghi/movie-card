const db = require('../config/config');

class Stars {
    static fetchAll() {
        return db.execute('SELECT * FROM stars');
    }

    static findById(id) {
        return db.execute('SELECT * FROM stars WHERE id = ?', [id]);
    }

static create(star) {
    const { name, date_of_birth, country, image } = star;
    if (!name || !date_of_birth || !country || !image) {
        return Promise.reject(new Error('Veuillez fournir toutes les informations nécessaires pour créer une star.'));
    }

    const formattedDateOfBirth = new Date(date_of_birth).toISOString().split('T')[0];
    return db.execute('CALL InsertStar(?, ?, ?, ?)', [name, formattedDateOfBirth, country, image]);
}


    static update(id, star) {
        return db.execute('CALL UpdateStar(?, ?, ?, ?, ?)', [id, star.name, star.date_of_birth, star.country, star.image]);
    }

    static delete(id) {
        return db.execute('CALL DeleteStar(?)', [id]);
    }
}

module.exports = Stars;
