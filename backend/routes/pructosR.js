const express = require('express');
const router = express.Router();
const {crearProducto, verProductos, verProductosID} = require('../controllers/productosCont')
const multer = require('multer');
const { requireLogin, adminMiddleware } = require('../middleware/middle');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const upload = multer ({storage});


router.post('/productos/crear', requireLogin, adminMiddleware , upload.array('imagenProducto') ,crearProducto);
router.get('/productos/:slug', verProductos);
router.get('/producto/:productoId', verProductosID);

module.exports = router; 