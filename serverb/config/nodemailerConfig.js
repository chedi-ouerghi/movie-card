const nodemailer = require('nodemailer');

const sendEmail = (name, email, message, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chediouerghi8@gmail.com',
      pass: 'wqno prin dqzh jkry',
    },
  });

  const mailOptions = {
    from: 'chediouerghi8@gmail.com',
    to: email,
    subject: 'Sujet du courriel',
    text: `Bonjour ${name},\n\nMerci pour votre message: ${message}.\n\nCordialement, Votre Nom`,
  };

  if (!mailOptions.to) {
    console.error('Aucun destinataire défini pour l\'e-mail.');
    res.status(500).json({ error: 'Aucun destinataire défini pour l\'e-mail.' });
    return;
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'e-mail : ', error);
      res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail.' });
    } else {
      console.log('E-mail envoyé : ' + info.response);
    }
  });
};

module.exports = { sendEmail };
