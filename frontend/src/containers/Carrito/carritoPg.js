import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { borrarCarrito } from '../../acciones/carritoAcc';
import LayoutTienda from '../../components/LayoutTienda/layoutTienda';
import { generarUrl } from '../../urlConfig';
import './estilosC.css';

/**
* @author
* @function Carrito
**/

const Carrito = (props) => {


    const carrito = useSelector(state => state.carrito);
    const dispatch = useDispatch();
    const [prodsCarrito, setProdsCarrito] = useState(carrito.productosCarrito);
    const [aviso, setAviso] = useState(false);

    useEffect(() => {
        setProdsCarrito(carrito.productosCarrito);
    }, [carrito.productosCarrito]);

    const borrarC = () => {
        dispatch(borrarCarrito())
    }
  

    return (

        <LayoutTienda>
            <div className="divCarrito">
                <div className="cardC" style={{ width: '850px' }}>
                    <div className="cardCHead">
                        <div>Mi carrito</div>
                      
                    </div>
                    {
                        Object.keys(prodsCarrito).map((key, index) =>
                            
                            <div key={index} className="fRow">
                              
                                <div className="prodCarrito">
                                    <img src={generarUrl(prodsCarrito[key].img)} alt={''} />
                                </div>
                                <div className="prodCarritoDetalles">
                                    <div>
                                        {prodsCarrito[key].nombre} - Cantidad - {prodsCarrito[key].cantidad}
                                        <div>${prodsCarrito[key].precio * prodsCarrito[key].cantidad}</div>
                                    </div>
                                    <div style={{ display: 'flex', margin: '5px 0' }}>
                                        <button className="botonE">Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="cardC" style={{ width: '800px' }}>
                    Cuenta:
                    {Object.keys(prodsCarrito).map((key, index) =>
                    <div>${prodsCarrito[key].precio * prodsCarrito[key].cantidad}</div>
                )}
                <button className="botonE" onClick={borrarC}>Comprar</button>
                </div>
                
            </div>
        </LayoutTienda>
    )
}
export default Carrito