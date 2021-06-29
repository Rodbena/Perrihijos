const Carro = require('../models/carritoM');

function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {
        //you update code here

        Carro.findOneAndUpdate(condition, updateData, { upsert: true })
            .then(result => resolve())
            .catch(err => reject(err))

    });
}

exports.agregarProductoC = (req, res) => {

    Carro.findOne({ cliente: req.client._id })//Checar si ya existe un carro o no
        .exec((error, carro) => {
            if (error) {//hay un error
                return res.status(400).json({ error })
            } if (carro) {//Si el carro ya existe solo se tiene que agregar el producto nuevo

                let promiseArray = [];

                req.body.productosAgregados.forEach((prodC) => {
                    const producto = prodC.productos;
                    const existe = carro.productosAgregados.find(c => c.productos == producto);//Checar si el item ya esta en el carro para solo agregar cantidad
                    let condition, actualizar;

                    if (existe) {//Si ya está en el carro
                        condition = { cliente: req.client._id, "productosAgregados.productos": producto };
                        actualizar = {
                            "$set": {
                                "productosAgregados.$": prodC,
                            }
                        };

                    } else {//Si no está en el carro
                        condition = { cliente: req.client._id };
                        actualizar = {
                            "$push": {
                                "productosAgregados": prodC
                            }
                        };
                    }

                    promiseArray.push(runUpdate(condition, actualizar))
                })

                Promise.all(promiseArray)
                    .then(response => res.status(201).json({ response }))
                    .catch(error => res.status(400).json({ error }))
            } else {//Carro no existe entonces se tiene que crear nuevo carro
                const carrito = new Carro({
                    cliente: req.client._id,
                    productosAgregados: req.body.productosAgregados
                });
                carrito.save((error, carro) => {
                    if (error) {
                        return res.status(400).json({ error });
                    } if (carro) {
                        return res.status(201).json({ carro })
                    }
                });
            }

        })
};

exports.prodCarrito = (req, res) => {
    Carro.findOne({ cliente: req.client._id })
        .populate("productosAgregados.productos", "_id nombre precio imagenProducto")
        .exec((error, carro) => {
            if (error) return res.status(400).json({ error });
            if (carro) {
                let productosAgregados = {};
                carro.productosAgregados.forEach((item, index) => {
                    productosAgregados[item.productos._id.toString()] = {
                        _id: item.productos._id.toString(),
                        nombre: item.productos.nombre,
                        img: item.productos.imagenProducto[0].img,
                        precio: item.productos.precio,
                        cantidad: item.cantidad,
                    };
                });
                res.status(200).json({ productosAgregados });
            }
        });
};


exports.pagar = (req, res) => {
    Carro.deleteOne({ cliente: req.client._id })
        .exec((error, borrado) => {
            if (error) return res.status(400).json({ error });
            if (borrado) {
             res.status(200).json({ 
                 message: "Se borró el carrito"
              });
            }
        });
};