const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const upload = multer ({storage});

const { agregarCategoria, conseguirCategorias } = require('../controllers/categoriasControllador');
const { requireLogin, adminMiddleware } = require('../middleware/middle');

router.post('/categorias/crear', requireLogin, adminMiddleware, upload.single('imagenCategoria') ,agregarCategoria);//Todo lo que se llevara a cabo cuando se visite la ruta especificada
router.get('/categorias/vercategorias', conseguirCategorias);//Todo lo que se llevara a cabo cuando se visite la ruta especificada


module.exports = router; 