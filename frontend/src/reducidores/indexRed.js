import { combineReducers } from 'redux';
import autReducidor from './aut.reducidor';
import clienteReducidor from './cliente.reducidor';
import categoriaReductor from './catRed';
import productoReductor from './prodRed';
import prodTiendaReductor from './prodTiendaRes';
import autReducidorC from './autC.reducidor'
import carritoReducidor from './carritoRed'


const rootReducer = combineReducers({

    auth: autReducidor,
    cliente: clienteReducidor,
    categoria: categoriaReductor,
    producto: productoReductor,
    productoTienda: prodTiendaReductor,
    authC: autReducidorC,
    carrito : carritoReducidor

});

export default rootReducer;