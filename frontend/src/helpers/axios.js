import axios from 'axios';
import store from '../store/indexStore';
import {api} from '../urlConfig'

const token = window.localStorage.getItem('token');

const instanciaAxios = axios.create({
    baseURL: api,
    headers:{ //Crea el header authorization con el token del usuario, junto con bearer para poder destruir la sesión cuando se cierre
        'Authorization': token ? `Bearer ${token}` : ''
    }
})

instanciaAxios.interceptors.request.use((req) =>{
    const {authC} = store.getState();
    if(authC.token){
        req.headers.Authorization = `Bearer ${authC.token}`
    }
    return req; 
})


export default instanciaAxios;

