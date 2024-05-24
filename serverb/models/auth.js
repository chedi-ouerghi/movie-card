const db = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


class Auth {
static findByEmailAndPassword(email, password) {
    return db.execute('SELECT * FROM auth WHERE email = ?', [email])
        .then(([rows]) => {
            if (!rows || !rows.length) {
                return null;
            }
            const user = rows[0];
            return bcrypt.compare(password, user.password)
                .then(isValid => {
                    if (isValid) {
                        return user;
                    }
                    return null;
                });
        });
}

static findById(id) {
    return db.execute('SELECT * FROM auth WHERE id = ?', [id])
        .then(([rows]) => {
            if (!rows || !rows.length) {
                return null;
            }
            return rows[0];
        });
}

    static findByName(name) {
        return db.execute('SELECT * FROM auth WHERE nom = ?', [name]);
    }

    static getAll() {
        return db.execute('SELECT * FROM auth');
    }
    
    static async create(user) {
        const { nom, prenom, email, password, telephone, role } = user;

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const token = jwt.sign({ nom, prenom, email, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        return db.execute(
            'INSERT INTO auth (nom, prenom, email, password, telephone, role, token) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nom, prenom, email, hashedPassword, telephone, role, token]
        )
        .then(([result]) => {
            return { id: result.insertId, role, token };
        });
    }

    static generateToken(user) {
        return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}

module.exports = Auth;
