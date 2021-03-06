import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from '../Header/index'
import { NavLink} from 'react-router-dom';
import './estilos.css';

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
    <>
        <Header />
      {
        props.sidebar ?
          <Container fluid>
            <Row>
              <Col md={2} className="sidebar">
                <ul>
                  <li><NavLink exact to={'/admin'}>Home</NavLink></li>  
                  <li><NavLink to={'/productos'}>Productos</NavLink></li>
                  <li><NavLink to={'/categoria'}>Categoria</NavLink></li>
                </ul>
              </Col>
              <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
                {props.children}
              </Col>
            </Row>
          </Container>
          :
          props.children
      }
          
    </>
   )

 }

export default Layout;