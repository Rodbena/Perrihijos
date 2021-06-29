import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Container, Row, Col, Table } from 'react-bootstrap'
import Botton from '../../components/UI/Input/Botton'
import { useDispatch, useSelector } from 'react-redux'
import { agregarProducto } from '../../acciones/productos.acciones'
import NewModal from '../../components/UI/Modal/modal'
import './estilosA.css'

/**
* @author
* @function Productos
**/

const Productos = (props) => {

  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setcategoriaId] = useState('');
  const [imagenProducto, setImagen] = useState([]);
  const [show, setShow] = useState(false);
  const categoria = useSelector(state => state.categoria);
  const dispatch = useDispatch();
  const producto = useSelector(state => state.producto);
  const [prodDetalles, setMostrarProdDetalles] = useState(false);
  const [detallesP, setDetallesP] = useState(null)


  const cerrar = () => {
    setShow(false);
  }

  const handleClose = () => {

    const form = new FormData();
    form.append('nombre', nombre);
    form.append('cantidad', cantidad);
    form.append('precio', precio);
    form.append('descripcion', descripcion);
    form.append('categoria', categoriaId);

    for (let pic of imagenProducto) {
      form.append('imagenProducto', pic);
    }

    dispatch(agregarProducto(form));

    setShow(false);
  };

  const handleShow = () => setShow(true);

  const crearListaCategorias = (categorias, opciones = []) => {//Mostrar lista de categorias padres disponibles
    for (let categoria of categorias) {
      opciones.push({ value: categoria._id, nombre: categoria.nombre });
      if (categoria.children.length > 0) {
        crearListaCategorias(categoria.children, opciones)
      }
    }
    return opciones;
  }

  const manejarImagenes = (e) => { //Agreagar las imagenes al producto
    setImagen([
      ...imagenProducto,
      e.target.files[0]
    ]);
  };

  const mostrarProductos = () => {
    return (<Table style = {{fontSize: 15 }}responsive="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
        {
          producto.productos.length > 0 ?
            producto.productos.map(producto =>
              <tr onClick = {() => mostrarProdDetallesModal(producto)} key={producto._id}>
                <td>1</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.categoria.nombre}</td>
              </tr>
            ) : null
        }

      </tbody>
    </Table>)
  }

  const mostrarProd = () => {
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        modalTitle={'Agregar Producto Nuevo'}
        size = "lg"
      >
        <Botton
          label="Nombre"
          value={nombre}
          placeholder={'Nombre del producto'}
          onChange={(e) => setNombre(e.target.value)}
        />
        <Botton
          label="Cantidad"
          value={cantidad}
          placeholder={'Cantidad'}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <Botton
          label="Precio"
          value={precio}
          placeholder={'Precio del producto'}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <Botton
          label="Descripcion"
          value={descripcion}
          placeholder={'Nombre del producto'}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <select
          className="form-control"
          value={categoriaId}
          onChange={(e) => setcategoriaId(e.target.value)}>
          <option>Elegir categoria</option>
          {
            crearListaCategorias(categoria.categorias).map(option =>
              <option key={option.value} value={option.value}>{option.nombre}</option>)
          }
        </select>

        {
          imagenProducto.length > 0 ?
            imagenProducto.map((pic, index) => <div key={index}> {pic.name} </div>) : null
        }

        <input type='file' name='imagenProducto' onChange={manejarImagenes} />
      </NewModal>
    )
  }

  const handleCloseProdDetalles = () =>{
    setMostrarProdDetalles(false);
  }

  
  const mostrarProdDetallesModal = (producto) =>{
    setMostrarProdDetalles(true);
    setDetallesP(producto);
    //console.log(producto);
  }

  const mostrarProdDetalles = () =>{

    if(!detallesP){
      return null;
    }


    return(
      <NewModal
      show = {prodDetalles}
      handleClose = {handleCloseProdDetalles}
      modalTitle = {'Detalles'}
      >
      <Row>
        <Col md = "6">
          <label className = "key">Nombre</label>
          <p className = "value">{detallesP.nombre}</p>
        </Col>
        <Col md = "6">
          <label className = "key">Precio</label>
          <p className = "value">{detallesP.precio}</p>
        </Col>
        <Col md = "6">
          <label className = "key">Cantidad</label>
          <p className = "value">{detallesP.cantidad}</p>
        </Col>
        <Col md = "6">
          <label className = "key">Categoría</label>
          <p className = "value">{detallesP.categoria.nombre}</p>
        </Col>
        <Col md = "12">
          <label className = "key">Descripcion</label>
          <p className = "value">{detallesP.descripcion}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="key">Imágenes</label>
            <div style={{ display: "flex" }}>
              {detallesP.imagenProducto.map(picture => 
                <div className="contenedorImagen">
                  <img src={`http://localhost:5000/public/${picture.img}`}/>
                </div>
              )}
            </div>
        </Col>
      </Row>


      </NewModal>
    )
  }


  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Productos</h3>
              <button onClick={handleShow}>Agregar</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {mostrarProductos()}
          </Col>
        </Row>
      </Container>
      {mostrarProd()}
      {mostrarProdDetalles()}
    </Layout>
  )

}

export default Productos