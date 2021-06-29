const mongoose = require('mongoose');

//Modelo de la base de datos de usuarios, administradores
const clientSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    numTarjeta:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    passw:{
        type: String,
        required: true, 
    },
    nivel:{
        type: String,
        enum: ['normal', 'admin'],
        default: 'normal' 
    },
})


clientSchema.virtual('nombreCompleto')
.get(function(){
    return `${this.nombre} ${this.apellido}`;
})//Se crea una variable que contiene el nombre completo y el apellido


module.exports = mongoose.model('clientes', clientSchema)//Exportamos al cliente (nombre collecion) para poder utilizarlo y también su esquema