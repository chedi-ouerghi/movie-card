const db = require('../config/config');

class Contact {
  static getAll() {
    return db.execute('SELECT * FROM contact');
  }

  static findById(id) {
    return db.execute('SELECT * FROM contact WHERE id = ?', [id])
      .then(([rows]) => {
        if (!rows || !rows.length) {
          return null;
        }
        return rows[0];
      });
  }

  static create(contact) {
    const { name, email, message } = contact;
    return db.execute(
      'INSERT INTO contact (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
  }
}

module.exports = Contact;
