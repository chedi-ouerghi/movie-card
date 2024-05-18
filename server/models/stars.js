const moment = require('moment/moment');
const db = require('../config/config');

class Stars {
    static fetchAll() {
        return db.execute('SELECT * FROM stars');
    }

    static findById(id) {
        return db.execute('SELECT * FROM stars WHERE id = ?', [id]);
    }

    static create(star) {
        const { name, date_of_birth, country, image, description } = star;
        if (!name || !date_of_birth || !country || !image) {
            return Promise.reject(new Error('Veuillez fournir toutes les informations nécessaires pour créer une star.'));
        }

        const formattedDateOfBirth = new Date(date_of_birth).toISOString().split('T')[0];
        return db.execute('CALL InsertStar(?, ?, ?, ?, ?)', [name, formattedDateOfBirth, country, image, description]);
    }

   static update(id, star) {
        const { name, date_of_birth, country, image, description } = star;

        // Formatez la date au format YYYY-MM-DD HH:mm:ss pour correspondre au format de la base de données
        const formattedDateOfBirth = moment(date_of_birth).format('YYYY-MM-DD HH:mm:ss');

        return db.execute('CALL UpdateStar(?, ?, ?, ?, ?, ?)', [id, name, formattedDateOfBirth, country, image, description]);
    }

    static delete(id) {
        return db.execute('CALL DeleteStar(?)', [id]);
    }

static async fetchAllCountries() {
    try {
        const [rows] = await db.execute('SELECT DISTINCT country FROM stars');
        const countries = rows.map(row => row.country);
        return countries;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

    static async fetchByCountry(country) {
        try {
            const [rows] = await db.execute('SELECT * FROM stars WHERE country = ?', [country]);
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}


module.exports = Stars;
