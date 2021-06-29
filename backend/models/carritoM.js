const mongoose = require('mongoose');
//Nos permite crear las categorías padres e hijas aquí
const carritoSchema = new mongoose.Schema({

    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    productosAgregados:[{
        productos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Productos",
        required: true
        },
        cantidad:{
            type: Number,
            default: 1,
        },
    }]

})

module.exports = mongoose.model('carrito', carritoSchema);//Exportamos collecion y se esquema