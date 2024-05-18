
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'votre_adresse@gmail.com', 
    pass: 'votre_mot_de_passe', 
  },
});

module.exports = transporter;
