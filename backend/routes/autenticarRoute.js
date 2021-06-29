const express = require('express');
const {signup, login} = require("../controllers/autenticar")
const router = express.Router();
const { validarSignupRequest, isRequestValidate, validarLoginRequest } = require('../validators/auth');


router.post('/signup', validarSignupRequest, isRequestValidate ,signup);//Todo lo que se llevara a cabo cuando se visite la ruta especificada
router.post('/login', validarLoginRequest, isRequestValidate, login);//Todo lo que se llevara a cabo cuando se visite la ruta especificada


module.exports = router;