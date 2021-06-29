const slugify = require('slugify');
const Categoria = require("../models/categorias");

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

exports.agregarCategoria =  (req,res)=>{//Nos permite agregar categorias

    const categoriaObj ={
        nombre: req.body.nombre,
        slug: slugify(req.body.nombre)//Da un formato especial al nombre, para poder utilizarlo mas tarde
    }

    if(req.file){
        categoriaObj.fotoC = process.env.API + '/public/' +req.file.filename;
    }


    if(req.body.pId){
        categoriaObj.pId = req.body.pId;//Solo se crea un id del padre si el admin lo desea, de lo contrario es una categoria padre
        
    }

    const cat = new Categoria(categoriaObj);
    cat.save((error,categoria) =>{
        if(error) return res.status(400).json({error});
        if(categoria){
            return res.status(201).json({categoria});
        }

    });

}

exports.conseguirCategorias = (req,res) =>{//Nos permite ver todas las categorías existentes, nos muestra los hijos de los padres
    Categoria.find({})
    .exec((error, categoria) =>{
        if(error){
            return res.status(400).json({error});
        }
        if(categoria){
            const listaCategorias = agregarCategoria(categoria);
            res.status(200).json({listaCategorias});
        }
    })
}