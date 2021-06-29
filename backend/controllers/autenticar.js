const Client = require('../models/client');
const jwt = require('jsonwebtoken');
const {clienteR} = require('../server')
const redis = require('redis')


const clienteRe = redis.createClient({
    host: 'redis-13715.c232.us-east-1-2.ec2.cloud.redislabs.com',
    port: 13715,
    password: 'FGt4yB5AyIDNf3CJCOL8MyLkvWPvqvOP'
});

exports.signup = (req,res) =>{

    Client.findOne({ email: req.body.email})
    .exec((error,client) =>{//Checa que el mail no este en mongo para que pueda ser agregado, de lo contrario regresa error
        if(client) return res.status(400).json({
            message: 'El mail ya fue registrado'
        })
        const{
            nombre,
            apellido,
            email,
            passw,
            numTarjeta
        } = req.body
        const cliente = new Client({
            nombre,
            apellido, 
            email,
            passw,
            numTarjeta
        });

        cliente.save((error, data)=>{
            if(error){
                return res.status(400).json({//No se pudo crear al cliente
                    message: 'Hubo un error'
                });
            }
            if(data){
                return res.status(201).json({//Se registro al cliente bien
                    client: 'Cliente se ha registrado exitosamente'
                })
            }
        })

    })
}

exports.login = (req,res)=>{//Iniciar sesion como usuario normal
    Client.findOne({ email: req.body.email})
    .exec((error,client)=>{
        if(error){
            return res.status(400).json({error});
        }if(client){//Si el usuario existe
            const verdad = req.body.passw
            const pass = client.passw
            if((pass == verdad) && client.nivel == 'normal'){//Si el usuario y el password matchean 
                const token = jwt.sign({_id: client._id, nivel:client.nivel}, process.env.JSECRET, {expiresIn: "20d"})//Token expira despues de 20 dias
                 
                clienteRe.set(String(token), client.nombre);//Creamos una sesión en redis con el token generado para el usuario
                clienteRe.expire(String(token), 1800);//Le damos un tiempo de vida a la sesion

                const {_id, nombre, apellido, email, nivel, nombreCompleto} = client;
                res.status(200).json({
                    token,
                    client:{
                        _id, nombre, apellido, email, nivel, nombreCompleto
                    }
                });
            }else{//Si el password no matchea entonces se envía un mensaje
                return res.status(400).json({
                    message: 'Passd Incorrecto',
                    
                })
            }
        }
    })
}

