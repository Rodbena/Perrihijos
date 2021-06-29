import { categoriaConstantes } from "../acciones/consantesAcc";

const estadoInicial = {
    categorias: [],
    loading: false,
    error: null
};


const nuevasCategorias = (idP, categorias, categoria) =>{//Funcion recursiva
    let misCategorias = [];

    if(idP === undefined){//Si la categoría que se va a agregar es una padre
        return [
            ...categorias,
            {
                _id:categoria._id,
                nombre: categoria.nombre,
                slug: categoria.slug,
                children: [] 
            }
        ];
    }

    for(let cat of categorias){

        if(cat._id === idP){//Checamos si el id de la categoría tiene el mismo id que el pId
            misCategorias.push({
                ...cat,
                children: cat.children ? nuevasCategorias(idP, [...cat.children, {
                    _id:categoria._id,
                    nombre: categoria.nombre,
                    slug: categoria.slug,
                    IdPadre: categoria.pId,
                    children: categoria.children

                }], categoria) : []  //Si la categoria tiene hijos entonces se empieza la recursión para poder acceder a todas las categorias (padres/hijas)
            });
        }else{
            misCategorias.push({
                ...cat,
                children: cat.children  ? nuevasCategorias(idP, cat.children, categoria) : []  //Si la categoria tiene hijos entonces se empieza la recursión para poder acceder a todas las categorias (padres/hijas)
            });
        }


    }
    return misCategorias;
}



export default (state = estadoInicial, action) => {//Controla los diferentes comportamientos que puede tener agregar un categoría

    switch(action.type){
        case categoriaConstantes.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categorias: action.payload.categorias
            }
            break;
        case categoriaConstantes.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoriaConstantes.ADD_NEW_CATEGORY_SUCCESS:
            const categoria = action.payload.categoria;
            const categoriasActualizadas = nuevasCategorias(categoria.pId, state.categorias, categoria);
            console.log(categoriasActualizadas);
            

            state = {
                ...state,
                categorias: categoriasActualizadas,
                loading: false,
            }
            break;
        case categoriaConstantes.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...estadoInicial
            }
            break;
    }
    return state;
}