const {check, validationResult} = require('express-validator');

exports.validarSignupRequest = [//Verifica que los post no esten vacios y que el password tenga un longitud minima para pode registrarse
    check('nombre')
    .notEmpty()
    .withMessage('Nombre invalido'),
    check('apellido')
    .notEmpty()
    .withMessage('Apellido invalido'),
    check('email')
    .notEmpty()
    .withMessage('Email invalido'),
];


exports.validarLoginRequest = [//Checa que el mail y password sean validos para poder intetar ingresar al sitio
    check('email')
    .notEmpty()
    .withMessage('Email invalido'),
    check('passw') //Checar, por alguna razon se rompe a veces
    .notEmpty()
    .withMessage('Passd invalido')
];


exports.isRequestValidate = (req,res, next) =>{//Muestra cuales fueron los errores de validar los datos
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    next()
}