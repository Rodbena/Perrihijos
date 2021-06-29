import { productosConstantes } from "../acciones/consantesAcc";

const estadoInit = {//Estado inicial 
    productos: []
};

export default (state = estadoInit, action) => {//Maneja los diferentes outcomes que puede tener trabajar con los datos de los productos
    switch (action.type) {
        case productosConstantes.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                productos: action.payload.productos
            }
            break;
    }
    return state;
}