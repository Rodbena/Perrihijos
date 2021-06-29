const mongoose = require('mongoose');
//Nos permite crear los productos de cada categoría

const productosSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true, 
        unique: true
    },
    precio:{
        type: Number,
        required: true
    },
    cantidad:{
        type: Number,
        required: true
    },
    descripcion:{
        type: String,
        required: true,
    },
    imagenProducto: [{
        img: {type: String}
    }],
    reviews:[
        {
            userId:{type : mongoose.Schema.Types.ObjectId, ref: 'Client'},
            review: String
        }
    ],
    categoria:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Categorias',
        required: true,
    },
    agregadoPor:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Client',
        required: true,
    }

})

module.exports = mongoose.model('Productos', productosSchema);//Exportamos collecion y se esquema