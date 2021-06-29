const Categoria = require('../../models/categorias');
const Producto = require('../../models/productosM');

function agregarCategoria(categorias, pId = null){//Agrega categorías a una lista que se mostrará
    
    const listaCategorias = [];
    let categoria;
    if(pId == null){//Va a ser nula si la categoria es padre
        categoria = categorias.filter(cat => cat.pId == undefined);
    }else{//La categoría es hija y tiene una cateogria padre
        categoria = categorias.filter(cat => cat.pId == pId);
    }

    for(let cate of categoria){//Funcion recursiva que nos muestra todas las categorias y los hijos de categorias
        listaCategorias.push({
            _id: cate.id,
            nombre: cate.nombre,
            slug: cate.slug,
            IdPadre: cate.pId,
            children: agregarCategoria(categorias, cate.id)
        });
    }
    return listaCategorias;
}

exports.datosIniciales = async (req, res) => {

    const categorias = await Categoria.find({}).exec();//Como el find es vacío nos regresará todas las categorías disponibles
    const productos = await Producto.find({})//Regresa todos los productos
    .select('_id nombre precio cantidad slug descripcion imagenProducto categoria')
    .populate({ path: "categoria", select: '_id nombre'})//Juntamos las categorías correctas a c/d producto
    .exec();//Regresa todos los productos de la base
    
    res.status(200).json({
        categorias: agregarCategoria(categorias),
        productos
    })
}