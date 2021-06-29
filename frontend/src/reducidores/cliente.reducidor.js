import { clientConstantes } from "../acciones/consantesAcc";

const estadoInicial = {
    error: null,
    message: '',
    loading: false
};

export default (state = estadoInicial, action) =>{//Controlador de signup 

    switch(action.type){
        case clientConstantes.USER_REGISTER_REQUEST:
            state ={
                ...state,
                loading: true
            }
            break;
    
        case clientConstantes.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
            
        case clientConstantes.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;    
    }
    return state;
}