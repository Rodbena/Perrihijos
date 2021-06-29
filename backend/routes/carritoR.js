const express = require('express');
const router = express.Router();
const { agregarProductoC, prodCarrito, pagar} = require('../controllers/carritoCont');
const { requireLogin, clientMiddleware } = require('../middleware/middle');

router.post('/usuario/carrito/agregar', requireLogin, clientMiddleware ,agregarProductoC);//Todo lo que se llevara a cabo cuando se visite la ruta especificada

router.post('/usuario/verCarrito', requireLogin, clientMiddleware, prodCarrito);//Con esta direccion podemos recuperar los productos de cd carrito de los usuarios

router.post('/usuario/borrarCarrito', requireLogin, clientMiddleware, pagar); //Una vez que el usuario compra los productos se borra el carrito

module.exports = router; 