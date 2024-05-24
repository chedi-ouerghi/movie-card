const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Token reçu:', token); 

    if (!token) {
        console.log('Token non fourni');
        return res.status(401).json({ message: 'Token non fourni' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            console.log('Erreur de vérification du token:', err.message);
            return res.status(403).json({ message: 'Token non valide' });
        }
        
        console.log('Token décodé:', decodedToken);

        req.user = {
            id: decodedToken.id,
            nom: decodedToken.nom,
            prenom: decodedToken.prenom,
            email: decodedToken.email,
            role: decodedToken.role
        };

        next();
    });
};

module.exports = authenticateToken;
