import React, {useEffect, useState} from 'react'
import { Route, Switch} from 'react-router-dom';
import Home from './containers/Home/homePg';
import Login from './containers/Login/loginPg'
import Signup from './containers/Signup/signupPg';
import RutaPrivada from './components/HOC/rutaPrivada';
import { useDispatch, useSelector } from 'react-redux';
import { sesionIniciada } from './acciones/aut.acciones';
import Productos from './containers/Productos/productosPg';
import Ordenes from './containers/Ordenes/ordenesPg';
import Categoria from './containers/Categorias/categoriaPg';
import { tomarDatosInit } from './acciones/datosIniciales.acciones';
import Tienda from './containers/Tienda/tiendaPg';
import ListaProductos from './containers/ListaProductos/ListaProdPg';
import { sesionIniciadaC } from './acciones/autC.acciones';
import DetallesProducto from './containers/DetallesProdu/detallesPg';
import Carrito from './containers/Carrito/carritoPg';
import { actualizarCarrito } from './acciones/backcarritoAcc';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const authC = useSelector(stateC => stateC.authC)

  useEffect(() =>{
    if(!auth.authenticate){
      dispatch(sesionIniciada());
      dispatch(tomarDatosInit());
    }
  }, [auth.authenticate])

  useEffect(() =>{
    if(!authC.authenticateC){
      dispatch(sesionIniciadaC());
    }
  }, [authC.authenticateC])

  useEffect(() => {
   dispatch(actualizarCarrito())
  }, [authC.authenticateC])

  
  return (//Rutas que nuestra app puede accesar, hay rutas privadas (admin) y rutas para clientes
    <div className="App">
        <Switch>
          <RutaPrivada path = "/admin" exact component = {Home} />
          <RutaPrivada path = "/productos" exact component = {Productos} />
          <RutaPrivada path = "/ordenes" exact component = {Ordenes} />
          <RutaPrivada path = "/categoria" exact component = {Categoria} />
          
          <Route path = "/" exact component = {Tienda} />
          <Route path = "/signup" exact component = {Signup} />
          <Route path = "/login" exact component = {Login} />
          <Route path = "/carrito" exact component = {Carrito} />
          <Route path = "/:productoSlug/:productoId/producto" exact component = {DetallesProducto} />
          <Route path = "/:slug" exact component = {ListaProductos} />
         
          
        </Switch>
    </div>
  );
}

export default App;
