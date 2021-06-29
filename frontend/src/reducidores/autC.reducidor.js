import { authConstantesC } from "../acciones/consantesAcc";

const estadoInicialC = {
    token: null,
    cliente:{
        nombre: '',
        apellido: '',
        email: ''
    },
    authenticateC: false,
    authenticatingC: false,
    loading: false,
    error: null,
    message: ''
};


export default (stateC = estadoInicialC, action) =>{

    console.log(action)
    
    switch(action.type){//Switch para poder manejar los diferentes outcomes que puede tener ingresar o cerrar sesión
        case authConstantesC.LOGIN_REQUESTC:
            stateC = {
                ...stateC,
                authenticatingC: true
            }
            break;
        case authConstantesC.LOGIN_SUCCESSC:
            stateC = {
                ...stateC,
                cliente:  action.payload.client,
                token: action.payload.token,
                authenticateC: true,
                authenticatingC: false
            }
            break;

        case authConstantesC.LOGOUT_REQUESTC:
            stateC = {
                ...stateC,
                loading: true
            }
            break;
        case authConstantesC.LOGOUT_SUCCESSC:
            stateC = {
                ...estadoInicialC
            }
            break;

        case authConstantesC.LOGOUT_REQUESTC:
            stateC = {
                ...stateC,
                error: action.payload.error,
                loading: false
            }
            break;

    }

    return stateC;
}