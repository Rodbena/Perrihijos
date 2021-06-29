import { clientConstantes } from "./consantesAcc"
import axios from "../helpers/axios"


export const crearCuenta = (cliente) =>{//Recibe un email y password ingresado en la pagina, para que un admin sea

    console.log(cliente)

    return async (dispatch) =>{
        

        dispatch({ type: clientConstantes.USER_REGISTER_REQUEST});

        const res = await axios.post('/admin/signup',{//Hace una señal post con los datos que quieres enviar
            ...cliente
        });

        if(res.status === 201){//Si el usuario se pudo crear
            const { message } = res.data;
            dispatch({
                type: clientConstantes.USER_REGISTER_SUCCESS,
                payload: {message}
            });
        }else{
            if(res.status === 400){//Si hubo en error y el usuasrio no se pudo crear
                dispatch({
                    type: clientConstantes.USER_REGISTER_FAILURE,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}

export const crearCuentaC = (cliente) =>{//Recibe los datos del cliente para crearse la cuenta en la tienda

    console.log(cliente)

    return async (dispatch) =>{
        

        dispatch({ type: clientConstantes.USER_REGISTER_REQUESTC});

        const res = await axios.post('/signup',{//Hace una señal post con los datos que quieres enviar
            ...cliente
        });

        if(res.status === 201){//Si el usuario se pudo crear
            const { message } = res.data;
            dispatch({
                type: clientConstantes.USER_REGISTER_SUCCESSC,
                payload: {message}
            });
        }else{
            if(res.status === 400){//Si hubo en error y el usuasrio no se pudo crear
                dispatch({
                    type: clientConstantes.USER_REGISTER_FAILUREC,
                    payload: { error: res.data.error }
                });
            }
        }
    }
}