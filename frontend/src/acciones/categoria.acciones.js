import axios from "../helpers/axios"
import { categoriaConstantes } from "./consantesAcc";


export const todasCategorias = () =>{

    return async dispatch => {
        dispatch({ type: categoriaConstantes.GET_ALL_CATEGORIES_REQUEST});
        const res = await axios.get('categorias/vercategorias');
        console.log(res);
        
        
        if(res.status === 200){//Si las categorías se pudieron recuperar sin problemas
            const {listaCategorias} = res.data;
            dispatch({
                type: categoriaConstantes.GET_ALL_CATEGORIES_SUCCESS,
                payload: {categorias : listaCategorias}
            });
        }else{//Hubo un error al recupera las categorias
            dispatch({
                type: categoriaConstantes.GET_ALL_CATEGORIES_FAILURE,
                payload: {error: res.data.error}
            })
        }
    } 
}


export const agregarCategoria = (form) => {//Los datos del form que recibe de la página serán agregados a mongo
    return async dispatch =>{
        dispatch({ type: categoriaConstantes.ADD_NEW_CATEGORY_REQUEST });
        const res = await axios.post('/categorias/crear', form);
        if (res.status === 201) {
            dispatch({
                type: categoriaConstantes.ADD_NEW_CATEGORY_SUCCESS,
                payload: { categoria: res.data.categoria }
            });
        }else {
            dispatch({ 
                type: categoriaConstantes.ADD_NEW_CATEGORY_FAILURE,
                payload: res.data.error
            });
        }
    }
}