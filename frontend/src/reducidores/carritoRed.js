import { carritoConstantes } from "../acciones/consantesAcc";

const estadoInicial = {
    productosCarrito: {},
    actualizarC: false,

};

export default (state = estadoInicial, action) => {
    switch (action.type) {
        case carritoConstantes.ADD_CARRITO_REQUEST:
            state = {
                ...state,
                actualizarC: true     
            }
            break;

        case carritoConstantes.ADD_CARRITO:
            state = {
                ...state,
                productosCarrito: action.payload.productosCarrito,
                actualizarC: false,
            }
            break;
        case carritoConstantes.ADD_CARRITO_FAILURE:
            state = {
                ...state,
                actualizarC: false,
            }
            break;


        case carritoConstantes.RESET_CARRITO:
            state = {
                ...estadoInicial
            }
            break;
    }
    return state;
}

