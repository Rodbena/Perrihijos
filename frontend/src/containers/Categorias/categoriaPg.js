import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { agregarCategoria } from '../../acciones/categoria.acciones'
import Layout from '../../components/Layout'
import Botton from '../../components/UI/Input/Botton'
import NewModal from '../../components/UI/Modal/modal'
import './estilos.css'

/**
* @author
* @function Categoria
**/

const Categoria = (props) => {

  const categoria = useSelector(state => state.categoria);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [nombre, setNombreCategoria] = useState('');
  const [pId, setIdPadre] = useState('');
  const [imagenCategoria, setImagenC] = useState('');


  const cerrar = () => {
    setShow(false);
  }

  const handleClose = () => {

    const form = new FormData();

    form.append('nombre', nombre);
    form.append('pId', pId);
    form.append('imagenCategoria', imagenCategoria);
    dispatch(agregarCategoria(form));
    setNombreCategoria('');
    setIdPadre('');
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const mostrarCategorias = (categorias) => {

    let todasCategorias = [];
    for (let categoria of categorias) {
      todasCategorias.push(
        <li key={categoria.nombre}>
          {categoria.nombre}
          {categoria.children.length > 0 ? (<ul>{mostrarCategorias(categoria.children)}</ul>) : null}
        </li>
      );
    }
    return todasCategorias;
  }


  const crearListaCategorias = (categorias, opciones = []) => {//Mostrar lista de categorias padres disponibles
    for (let categoria of categorias) {
      opciones.push({ value: categoria._id, nombre: categoria.nombre });
      if (categoria.children.length > 0) {
        crearListaCategorias(categoria.children, opciones)
      }
    }
    return opciones;
  }

  const agregarImagenCat = (e) => {
    setImagenC(e.target.files[0]);
  }


  return (
    <Layout sidebar>
      <Container>
        <Row className>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Categoria</h3>
              <button onClick={handleShow}>Agregar</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>
              {mostrarCategorias(categoria.categorias)}
            </ul>
          </Col>
        </Row>
      </Container>

      <NewModal
        show={show}
        handleClose={handleClose}
        modalTitle={'Agregar Categoría Nueva'}
      >
        <Row>
          <Col>
            <Botton
              value={nombre}
              placeholder={'Nombre de Categoria'}
              onChange={(e) => setNombreCategoria(e.target.value)}
            />
          </Col>
          <Col>
            <select
              className="form-control"
              value={pId}
              onChange={(e) => setIdPadre(e.target.value)}>
              <option>Elegir categoria Padre</option>
              {
                crearListaCategorias(categoria.categorias).map(option =>
                  <option key={option.value} value={option.value}>{option.nombre}</option>)
              }
            </select>
          </Col>
        </Row>
      </NewModal>
    </Layout>
  )
}

export default Categoria