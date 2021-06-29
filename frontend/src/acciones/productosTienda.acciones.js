import axios from "../helpers/axios"
import { productosTiendaConstantes } from "./consantesAcc";




export const productosPorSlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/productos/${slug}`);

        if(res.status === 200){//Si no hay error
            dispatch({
                type: productosTiendaConstantes.GET_PRODUCTS_SLUG,
                payload: res.data                
            })
        }

        console.log(res);
    }
}


export const productosPorId = (payload) => {
    return async dispatch => {
        dispatch({
            type: productosTiendaConstantes.GET_ALL_DETAILS_REQUEST
        });
        let res;
        try{ 
            const {productoId} = payload.params;
            res = await axios.get(`/producto/${productoId}`);
            console.log(res);
            dispatch({
                type: productosTiendaConstantes.GET_ALL_DETAILS_SUCCESS,
                payload: {detallesProducto: res.data.producto}
            });
        }catch(error){
            console.log(error);
            dispatch({
                type: productosTiendaConstantes.GET_ALL_DETAILS_FAILURE,
                payload: {error: res.data.error}
            })
        }


    }
}