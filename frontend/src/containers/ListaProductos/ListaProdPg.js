import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { productosPorSlug } from '../../acciones/productosTienda.acciones';
import LayoutTienda from '../../components/LayoutTienda/layoutTienda'
import { generarUrl } from '../../urlConfig';
import './estilos.css'


/**
* @author
* @function ListaProductos
**/

const ListaProductos = (props) => {

  const dispatch = useDispatch();

  const producto = useSelector(state => state.productoTienda)


  useEffect(() => {
    const { match } = props
    dispatch(productosPorSlug(match.params.slug))
  }, []);


  return (
    <LayoutTienda>
      <div className="card">
        <div className="cardHead">
          <div>{props.match.params.slug} para tu mascota</div>
        </div>
        <div style={{ display: 'flex' }}>

          {
            producto.productos.map((producto) => {
              return (
                <Link
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "#000",
                    }}
                    className="productos"
                    to={`/${producto.slug}/${producto._id}/producto`}
                    >
                  <div className="imagenProducto">
                    <img src={generarUrl(producto.imagenProducto[0].img)} alt=""></img>
                  </div>
                  <div className="detallesProducto">
                    <div style={{ margin: '5px 0' }}>{producto.nombre}</div>
                    <div className="precioProducto">${producto.precio}</div>
                  </div>
                </Link>
              )
            })
          }

        </div>
      </div>
    </LayoutTienda >
  )

}

export default ListaProductos