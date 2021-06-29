import { authConstantesC } from "./consantesAcc"
import axios from "../helpers/axios"

//Acciones que nos permite controlar la sesión del usuario

export const loginC = (cliente) =>{//Recibe un email y password ingresado en la pagina

    console.log(cliente)

    return async (dispatch) =>{
        

        dispatch({ type: authConstantesC.LOGIN_REQUESTC});

        const res = await axios.post('/login',{
            ...cliente
        });

        if(res.status === 200){
            const {token, client} = res.data;
            localStorage.setItem('tokenC', token);
            localStorage.setItem('clientC', JSON.stringify(client));
            dispatch({
                type: authConstantesC.LOGIN_SUCCESSC,
                payload:{
                    token, client
                }
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: authConstantesC.LOGIN_FAILUREC,
                    payload: {error: res.data.error}
                });
            }
        }
    }
}

export const sesionIniciadaC = () =>{//Cuando se inicia sesion se guarda el token para mantenerla activa
    return async dispatch =>{
        const token = localStorage.getItem('tokenC');
        if(token){
            const client = JSON.parse(localStorage.getItem('clientC'))
            dispatch({
                type: authConstantesC.LOGIN_SUCCESSC,
                payload:{
                    token, client
                }
            })
        }else{
            dispatch({
                type: authConstantesC.LOGIN_FAILUREC,
                payload: {error: 'No se pudo iniciar sesion'}
            });
        }
    }
}

export const cerrarSesionC = () =>{

    return async dispatch =>{

        dispatch({type: authConstantesC.LOGOUT_REQUESTC});
        const res = await axios.post(`/cerrarSesion`);

        if(res.status === 200){
            localStorage.removeItem('tokenC');
            localStorage.removeItem('clientC');
            localStorage.clear();
            dispatch({//Si se pudo cerrar sesion
                type: authConstantesC.LOGOUT_SUCCESSC
            });
        }else{
            dispatch({//Si no se pudo cerrar sesion
                type: authConstantesC.LOGOUT_FAILUREC,
                payload: {error: res.data.error}
            })
        }
    }
    
}

