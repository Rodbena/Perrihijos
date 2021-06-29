import axios from '../helpers/axios'

export const agregarProducto = form =>{{

    return async dispatch =>{
        const res = await axios.post(`productos/crear`, form);
        console.log(res)
    }
}}