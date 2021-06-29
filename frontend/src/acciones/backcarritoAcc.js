import { carritoConstantes } from "../acciones/consantesAcc";
import store from "../store/indexStore"
import { leerCarrito } from "./carritoAcc";


export const agregarCarrito = (producto) => {
    return async dispatch => {
        const { productosCarrito } = store.getState().carrito;// recupera todos los productos del carrito
        const cantidad = productosCarrito[producto._id] ? parseInt(productosCarrito[producto._id].cantidad + 1) : 1;//Se busca si ya está un tipo de artículo en el carro, para agregarla 1 a la cantidad 
        productosCarrito[producto._id] = {//Las llaves serán los ids de cada producto para poder diferenciarlos en el carrito
            ...producto,
            cantidad
        }

        localStorage.setItem("carrito", JSON.stringify(productosCarrito));//Se guarda el carrito y su cantidad en el local storage para que no se pierdan

        dispatch({
            type: carritoConstantes.ADD_CARRITO,
            payload: {productosCarrito}
        });
    }
}

export const actualizarCarrito = () => {
    return async dispatch => {
        const carrito = localStorage.getItem('carrito') ?
            JSON.parse(localStorage.getItem('carrito')) : dispatch(leerCarrito());

        if (carrito) {
            dispatch({
                type: carritoConstantes.ADD_CARRITO,
                payload: { productosCarrito: carrito }
            })
        }

    }
}