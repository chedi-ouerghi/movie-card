
// middleware/checkRole.js
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            console.log(`Accès refusé pour le rôle ${req.user.role}`);
            return res.status(403).json({ message: 'Accès refusé' });
        }
        next();
    };
};

module.exports = checkRole;

