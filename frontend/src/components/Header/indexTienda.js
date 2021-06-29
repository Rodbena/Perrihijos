import React, { useEffect, useState } from 'react';
import './estilos.css';
import PerrihijosLogo from '../../imagenes/perrihijos.jpg';
import { IoIosCart, IoIosSearch } from 'react-icons/io';
import { Modal, IngresarDatos, BotonM, MenuDropDown } from '../Materiales/materiales';
import { useDispatch, useSelector } from 'react-redux'
import { loginC } from '../../acciones/autC.acciones';
import { cerrarSesion } from '../../acciones/aut.acciones';
import { crearCuentaC } from '../../acciones/client.acciones';

/**
* @author
* @function HeaderTienda
**/

const HeaderTienda = (props) => {

  const [logear, setLogear] = useState(false);
  const [crearC, setcrearC] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [passw, setPassword] = useState('');
  const [numTarjeta, setNumTarjeta] = useState('');
  const dispatch = useDispatch();

  const authC = useSelector(stateC => stateC.authC);

  const iniciarSesionC = () => {
    dispatch(loginC({ email, passw }))
  }


  const crearCC = (e) =>{//Intento para crear la cuenta de usuario de la tienda

    const cliente = {
      nombre, apellido, email, passw, numTarjeta
    }
    dispatch(crearCuentaC(cliente));
  }

  const cerrarCuenta = () => {
    dispatch(cerrarSesion());
  }

  useEffect(() => {
    if (authC.authenticateC) {
      setLogear(false)
      setcrearC(false)
    }
  })

  const cargarIniciado = () => {
    return (
      <div className="menuD">
        <MenuDropDown
          menu={
            <a className="ingresarC">
              {authC.cliente.nombre}
            </a>
          }
        />
        <div>
          <MenuDropDown
            menu={
              <a className="ingresarB" onClick={cerrarCuenta} href="http://localhost:3000/">
                {"Cerrar Sesión"}
              </a>
            }
          />
        </div>

        <div>
          <a className="carrito" href="http://localhost:3000/carrito">
            <IoIosCart />
            <span style={{ margin: '0 10px' }}>Carrito</span>
          </a>
        </div>
      </div>
    )
  }

  const cargarNoIniciado = () => {
    return (
      <div className="menuD">
        <MenuDropDown
          menu={
            <a className="ingresarB" onClick={() => setLogear(true)}>
              Ingresar
            </a>
          }
        />
        <div className="prueba">
          <MenuDropDown
            menu={
              <a className="ingresarB" onClick={() => setcrearC(true)}>
                Crear Sesion
              </a>
            }
          />
        </div>
      </div>
    )
  }


  return (
    <div className="headerTienda">
      <Modal
        visible={logear}
        onClose={() => setLogear(false)}
      >
        <div className="authContainer">
          <div className="rowd">
            <div className="leftspace">
              <h2>Ingresar</h2>
              <p>Obtener acceso al carrito, hacer compras y ver todo lo que quieras comprar</p>
            </div>
            <div className="rightspace">
              <IngresarDatos
                type="text"
                label="Ingresar Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <IngresarDatos
                type="password"
                label="Ingresar Password"
                value={passw}
                onChange={(e) => setPassword(e.target.value)}
              />

              <BotonM
                title="Ingresar"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{ margin: '100px 0px' }}
                onClick={iniciarSesionC}
              />
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        visible={crearC}
        onClose={() => setcrearC(false)}
      >
        <div className="authContainer">
          <div className="rowd">
            <div className="leftspace">
              <h2>Crear Cuenta</h2>
              <p>Crear cuanta para poder tener acceso al carrito, hacer compras y ver todo lo que quieras comprar</p>
            </div>
            <div className="rightspace">
              <IngresarDatos
                label="Nombre"
                placeholder="Nombre"
                value={nombre}
                type="text"
                onChange={(e) => { setNombre(e.target.value) }}
              />
              <IngresarDatos
                label="Apellido"
                placeholder="Apellido"
                value={apellido}
                type="text"
                onChange={(e) => { setApellido(e.target.value) }}
              />

              <IngresarDatos
                type="text"
                label="Ingresar Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <IngresarDatos
                type="password"
                label="Ingresar Password"
                value={passw}
                onChange={(e) => setPassword(e.target.value)}
              />

              <IngresarDatos
                type="text"
                label="Ingresar Numero de Tarjeta"
                value={numTarjeta}
                onChange={(e) => setNumTarjeta(e.target.value)}
              />


              <BotonM
                title="Crear Cuenta"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{ margin: '100px 0px' }}
                onClick={crearCC}
              />
            </div>
          </div>
        </div>
      </Modal>



      <div className="subHeader">
        <div className="logo">
          <a href="http://localhost:3000/">
            <img src={PerrihijosLogo} className="logoimage" alt="" />
          </a>
        </div>
        <div style={{
          padding: '0 10px'
        }}>
          <div className="buscar">
            <input
              className="buscNombre"
              placeholder={'Buscar Productos'}
            />
            <div className="contenedorBusqueda">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>

          </div>
        </div>

        {authC.authenticateC ? cargarIniciado() : cargarNoIniciado()}

      </div>
    </div>
  )

}

export default HeaderTienda