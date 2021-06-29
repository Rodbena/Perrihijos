const mongoose = require('mongoose');
//Nos permite crear las categorías padres e hijas aquí
const categoriaSchema = new mongoose.Schema({

    nombre:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true, 
        unique: true
    },
    pId:{
        type: String
    },
    fotoC:{
        type: String
    }
})

module.exports = mongoose.model('Categorias', categoriaSchema);//Exportamos collecion y se esquema