const express = require('express');
const {signup, login, cerrarSesion} = require("../../controllers/controllersAdmin/autenticar");
const { requireLogin } = require('../../middleware/middle');
const { validarSignupRequest, isRequestValidate, validarLoginRequest} = require('../../validators/auth');
const router = express.Router();



router.post('/admin/signup', validarSignupRequest, isRequestValidate, signup);//Todo lo que se llevara a cabo cuando se visite la ruta especificada
router.post('/admin/login', validarLoginRequest, isRequestValidate, login);//Todo lo que se llevara a cabo cuando se visite la ruta especificada
router.post('/admin/cerrarSesion', cerrarSesion);//Middelware que se lleva a cabo cuando se va a esta ruta


module.exports = router;