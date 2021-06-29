import { carritoConstantes } from "../acciones/consantesAcc";
import store from "../store/indexStore"
import axios from "../helpers/axios"

    

const leerCarrito = () => {
    return async dispatch => {
        try {
            dispatch({type : carritoConstantes.ADD_CARRITO_REQUEST});
            const res = await axios.post('/usuario/verCarrito');
            if (res.status === 200) {
                const { productosAgregados } = res.data;
                localStorage.setItem('carrito', JSON.stringify(productosAgregados));
                console.log({ leerCarrito: productosAgregados })

            }
        } catch (error) {
            console.log(error);
        }
    }
}


export const borrarCarrito = () => {
    return async dispatch => {
        try {
            dispatch({type : carritoConstantes.RESET_CARRITO});
            const res = await axios.post('/usuario/borrarCarrito');
            if (res.status === 200) {
                localStorage.removeItem('carrito');
            }
        } catch (error) {
            console.log(error);
        }
    }
}


export const agregarCarrito = (producto, newQty = 1) => {//Le enviamos el prod y la cantidad agregada
    return async dispatch => {

        const { carrito: {
            productosCarrito
        }, authC} = store.getState();


        const cantidad = productosCarrito[producto._id] ? parseInt(productosCarrito[producto._id].cantidad + newQty) : 1;//Se busca si ya está un tipo de artículo en el carro, para agregarla 1 a la cantidad 
        productosCarrito[producto._id] = {//Las llaves serán los ids de cada producto para poder diferenciarlos en el carrito
            ...producto,
            cantidad
        }

        if(authC.authenticateC){
            dispatch({
                type: carritoConstantes.ADD_CARRITO_REQUEST
            });
            const payload = {
                productosAgregados: [{
                    productos: producto._id,
                    cantidad: cantidad
                }]
            };
            console.log(payload);

            const res = await axios.post('/usuario/carrito/agregar', payload);
            console.log(res);
            
            if (res.status === 201) {
                dispatch(leerCarrito());
            }
        }

        dispatch({
            type: carritoConstantes.ADD_CARRITO,
            payload: { productosCarrito }
        });
    }
}

export const actualizarCarrito = () => {
    return async dispatch => {

        const { authC } = store.getState();

        let productosCarrito = localStorage.getItem('carrito') ?
            JSON.parse(localStorage.getItem('carrito')) : null;

        if(authC.authenticateC){
            localStorage.removeItem('carrito');
            if(productosCarrito){
                const payload = {
                    productosCarrito: Object.keys(productosCarrito).map((key, index) =>{
                        return{
                            cantidad: productosCarrito[key].cantidad,
                            productos: productosCarrito[key]._id
                        }
                    })
                };

                if(Object.keys(productosCarrito).length > 0){
                    const res = await axios.post('/usuario/carrito/agregar', payload);
                    if(res.status === 201){
                        dispatch(leerCarrito())
                    }
                }

            }
        }    

    }
}

export {
    leerCarrito
}