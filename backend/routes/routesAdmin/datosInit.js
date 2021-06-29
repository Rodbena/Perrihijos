const express = require('express');
const { datosIniciales } = require('../../controllers/controllersAdmin/datosInit');
const router = express.Router();



router.post('/datosIniciales', datosIniciales);

module.exports = router;