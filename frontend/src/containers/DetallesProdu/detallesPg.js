import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productosPorId } from '../../acciones/productosTienda.acciones';
import LayoutTienda from '../../components/LayoutTienda/layoutTienda'
import { IoIosStar, IoMdCart } from 'react-icons/io';
import { generarUrl } from '../../urlConfig';
import { BotonM } from '../../components/Materiales/materiales';
import './estilos.css'
import { agregarCarrito } from '../../acciones/carritoAcc';

/**
* @author
* @function DetallesProducto
**/

const DetallesProducto = (props) => {

    const authC = useSelector(stateC => stateC.authC);
    const dispatch = useDispatch();
    const producto = useSelector(state => state.productoTienda.detallesProducto);

    useEffect(() => {
        const { productoId } = props.match.params;
        console.log(props);
        const payload = {
            params: {
                productoId
            }
        }
        dispatch(productosPorId(payload));

    }, []);


    const cargarIniciado = () => {
        return (
            <BotonM
                title="Agregar al carrito"
                style={{
                    marginRight: '50px',
                    marginLeft: '50px',
                }}
                onClick = {() =>{
                    const {_id, nombre, precio} = producto;
                    const imagen = producto.imagenProducto[0].img;
                    dispatch(agregarCarrito({_id, nombre, precio,  imagen}))
                    
                }}
            />
        )
    }

    const cargarNoIniciado = () => {
        return null;
    }

    if (Object.keys(producto).length === 0) {
        return null;
    }



    return (
        <LayoutTienda>
            <div className="descripcionDiv">
                <div className="fRow">
                    <div className="imagenes">
                        {
                            producto.imagenProducto.map((thumb, index) =>
                                <div className="fotosP">
                                    <img src={generarUrl(thumb.img)} alt={thumb.img} />
                                </div>
                            )
                        }
                    </div>
                    <div className="prodDiv">
                        <div className="imgDiv">
                            <img src={generarUrl(producto.imagenProducto[0].img)} alt={`${producto.imagenProducto[0].img}`} />
                        </div>

                        {/* action buttons */}
                        <div className="fRow">
                            {authC.authenticateC ? cargarIniciado() : cargarNoIniciado()}


                        </div>
                    </div>
                </div>

                <div>
                    <div className="detalles">
                        <p className="titulo">{producto.nombre}</p>
                        <div>
                            <span className="cali">100 <IoIosStar /></span>
                            <span className="resena">1 calificación</span>
                        </div>

                        <div className="fRow precioDiv">
                            <span className="precio">${producto.precio}</span>

                        </div>
                        <div>

                            <p style={{ display: 'flex' }}>
                                <span style={{
                                    width: '100px',
                                    fontSize: '12px',
                                    color: '#878787',
                                    fontWeight: '600',
                                    marginRight: '20px'
                                }}>Descripción</span>
                                <span style={{
                                    fontSize: '12px',
                                    color: '#212121',
                                }}>{producto.descripcion}</span>
                            </p>
                        </div>
                    </div>


                </div>
            </div>
        </LayoutTienda>
    )

}

export default DetallesProducto