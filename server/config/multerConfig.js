const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ne stocke pas les fichiers sur le serveur, juste le nom du fichier
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Utilisez le nom d'origine du fichier sans stockage réel
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and GIF files are allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
