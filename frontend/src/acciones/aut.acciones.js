import { authConstantes } from "./consantesAcc"
import axios from "../helpers/axios"

//Acciones que nos permite controlar la sesión del usuario

export const login = (cliente) =>{//Recibe un email y password ingresado en la pagina

    console.log(cliente)

    return async (dispatch) =>{
        

        dispatch({ type: authConstantes.LOGIN_REQUEST});

        const res = await axios.post('/admin/login',{
            ...cliente
        });

        if(res.status === 200){
            const {token, client} = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('client', JSON.stringify(client));
            dispatch({
                type: authConstantes.LOGIN_SUCCESS,
                payload:{
                    token, client
                }
            });
        }else{
            if(res.status === 400){
                dispatch({
                    type: authConstantes.LOGIN_FAILURE,
                    payload: {error: res.data.error}
                });
            }
        }
    }
}

export const sesionIniciada = () =>{//Cuando se inicia sesion se guarda el token para mantenerla activa
    return async dispatch =>{
        const token = localStorage.getItem('token');
        if(token){
            const client = JSON.parse(localStorage.getItem('client'))
            dispatch({
                type: authConstantes.LOGIN_SUCCESS,
                payload:{
                    token, client
                }
            })
        }else{
            dispatch({
                type: authConstantes.LOGIN_FAILURE,
                payload: {error: 'No se pudo iniciar sesion'}
            });
        }
    }
}

export const cerrarSesion = () =>{

    return async dispatch =>{

        dispatch({type: authConstantes.LOGOUT_REQUEST});
        const res = await axios.post(`/admin/cerrarSesion`);

        if(res.status === 200){
            localStorage.clear();
            dispatch({//Si se pudo cerrar sesion
                type: authConstantes.LOGOUT_SUCCESS
            });
        }else{
            dispatch({//Si no se pudo cerrar sesion
                type: authConstantes.LOGOUT_FAILURE,
                payload: {error: res.data.error}
            })
        }
    }
    
}

