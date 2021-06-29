const Producto = require('../models/productosM');
const slugify = require('slugify')
const Categoria = require('../models/categorias')

exports.crearProducto = (req, res) => {
    //res.status(200).json({file: req.files, body: req.body})//Consigue la imagen que estmos subiendo
    const {
        nombre, precio, descripcion, categoria, cantidad, agregadoPor
    } = req.body;

    let imagenProducto = [] //Arreglo de las fotos del producto

    if (req.files.length > 0) {
        imagenProducto = req.files.map(file => {
            return { img: file.filename }
        });
    }

    const producto = new Producto({
        nombre: nombre,
        slug: slugify(nombre),
        precio,
        cantidad,
        descripcion,
        imagenProducto,
        categoria,
        agregadoPor: req.client._id //toma el id del cliente para poder asociarlo luego
    });


    producto.save(((error, producto) => {

        if (error) {//no se pudo guardar 
            return res.status(400).json({ error });
        } if (producto) {// se gurado sin problemas
            res.status(201).json({ producto });
        }

    }));


};

exports.verProductos = (req, res) => {//Buscamos los productos que esten relacionados con el slug dado
    const { slug } = req.params;
    if (slug) {
        Categoria.findOne({ slug: slug })//Busca que el slug exista
            .select('_id')
            .exec((error, categoria) => {
                if (error) {
                    return res.status(400).json({ error });
                }
                if (categoria) {//Si no hay error
                    Producto.find({ categoria: categoria._id })
                        .exec((error, productos) => {
                            if (error) {//Si ocurre un error por alguna razón
                                return res.status(400).json({ error });
                            } if (productos.length > 0) {
                                res.status(200).json({//Si se pueden recuperar los productos de la categoría
                                    slug,
                                    productos,
                                });
                            }
                        })
                }
            })
    } else {
        return res.status(400).json({
            error: 'Hubo un error'
        })
    }

}

exports.verProductosID = (req, res) => {//Buscamos un producto por su Id, para poder poner cada página de los productos
    const { productoId } = req.params;
    if (productoId) {
        Producto.findOne({ _id: productoId })
            .exec((error, producto) => {
                if (error) {
                    return res.status(400).json({
                        error
                    });
                } if (producto) {
                    res.status(200).json({
                        producto
                    });
                }
            })
    } else {
        return res.status(400).json({
            error: 'Hubo un error'
        })
    }
}