import { authConstantes } from "../acciones/consantesAcc";

const estadoInicial = {
    token: null,
    cliente:{
        nombre: '',
        apellido: '',
        email: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
};


export default (state = estadoInicial, action) =>{

    console.log(action)
    
    switch(action.type){//Switch para poder manejar los diferentes outcomes que puede tener ingresar o cerrar sesión
        case authConstantes.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstantes.LOGIN_SUCCESS:
            state = {
                ...state,
                cliente:  action.payload.client,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;

        case authConstantes.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstantes.LOGOUT_SUCCESS:
            state = {
                ...estadoInicial
            }
            break;

        case authConstantes.LOGOUT_REQUEST:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;

    }

    return state;
}