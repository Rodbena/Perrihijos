import { productosTiendaConstantes } from "../acciones/consantesAcc"

const estadoInicial = {//Arreglo de los productos inicial
    productos: [],
    detallesProducto: {},
    loading: false,
    error: null
}

export default (state = estadoInicial, action) => {//manejamos los diferentes outcomes que puedan pasar al obtener los productos

    switch (action.type) {
        case productosTiendaConstantes.GET_PRODUCTS_SLUG:
            state = {
                ...state,
                productos: action.payload.productos,
            }
            break;

        case productosTiendaConstantes.GET_ALL_DETAILS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productosTiendaConstantes.GET_ALL_DETAILS_SUCCESS:
            state = {
                ...state,
                loading: false,
                detallesProducto: action.payload.detallesProducto
            }
            break;
        case productosTiendaConstantes.GET_ALL_DETAILS_FAILURE:
            state = {
                ...state,
                loading: true,
                detallesProducto: action.payload.detallesProducto
            }
            break;

    }
    return state;
}