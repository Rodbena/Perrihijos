import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import {cerrarSesion} from '../../acciones/aut.acciones'


/**
* @author
* @function Header
**/

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const cerrarS = () =>{
        dispatch(cerrarSesion());
    }

    const cargarIniciado = () =>{
        return(
            <Nav>
                <li className = "nav-item">
                    <span className="nav-link" onClick = {cerrarS}>Cerrar Sesión</span>
                </li>
            </Nav>
        )
    }

    const cargarNoIniciado = () =>{
        return(
            <Nav>
                <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Ingresar</NavLink>
                </li>
                <li className = "nav-item">
                    <NavLink to="/signup" className="nav-link">Unirse</NavLink>
                </li>
            </Nav>
        )
    }


    return (
        <Navbar collapseOnSelect fixed = "top" expand="lg" bg="dark" variant="dark" style = {{zIndex: 1}}>
            <Container fluid>
                {/*<Navbar.Brand href="#home"></Navbar.Brand>*/}
                <Link to = "/admin" className = "navbar-brand">Soy Admin</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>

                    {auth.authenticate ? cargarIniciado() : cargarNoIniciado()}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Header