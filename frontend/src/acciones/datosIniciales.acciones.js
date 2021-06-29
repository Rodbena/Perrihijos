import axios from '../helpers/axios'
import { categoriaConstantes, productosConstantes } from "./consantesAcc"

export const tomarDatosInit = () => {//Toma los datos de todas las categorías y productos

    return async dispatch =>{

        const res = await axios.post(`/datosIniciales`);
        if(res.status === 200){//NO hubo ningun error
            const {categorias, productos} = res.data;
            dispatch({
                type: categoriaConstantes.GET_ALL_CATEGORIES_SUCCESS,
                payload: {categorias}
            });

            dispatch({
                type: productosConstantes.GET_ALL_PRODUCTS_SUCCESS,
                payload: {productos}
            });
        }
        console.log(res)
    }
}


