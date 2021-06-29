import React, {useState} from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input/Botton';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { crearCuenta } from '../../acciones/client.acciones';


/**
* @author
* @function Signup
**/

const Signup = (props) => {

  const[nombre, setNombre] = useState('');
  const[apellido, setApellido] = useState('');
  const[email, setEmail] = useState('');
  const[passw, setPassword] = useState("");
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const cliente  = useSelector(state => state.cliente)
  


  const crearC = (e) =>{//Intento para crear la cuenta de usuario
    e.preventDefault();
    const cliente = {
      nombre, apellido, email, passw
    }
    dispatch(crearCuenta(cliente));
  }

  if(auth.authenticate){//Si el usuario ya está ingresado entonces es redirigido hacia el menú
    return <Redirect to ={'/'}/>
  }

  if(cliente.loading){//Si se está cargando se espera un momento a que acabe
    return <p>Esperar a que carge </p>
  }


  return(
    <Layout>
      <Container>
        <Row style={{ marginTop: '100px' }}>
          <Col md={{span: 6, offset: 3}}>
            <Form onSubmit = {crearC}>
              <Row>
                <Col md={6}>
                  <Input
                    label = "Nombre"
                    placeholder = "Nombre"
                    value = {nombre}
                    type = "text"
                    onChange = {(e) => {setNombre(e.target.value)}}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label = "Apellido"
                    placeholder = "Apellido"
                    value = {apellido}
                    type = "text"
                    onChange = {(e) => {setApellido(e.target.value)}}
                  />
                </Col>
              </Row>

              <Input
                label = "Email"
                placeholder = "Email"
                value = {email}
                type = "email"
                onChange = {(e) => {setEmail(e.target.value)}}
              />

              <Input
                label = "Password"
                placeholder = "Password"
                value = {passw}
                type = "password"
                onChange = {(e) => {setPassword(e.target.value)}}
              />

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Based" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
   )

 }

export default Signup