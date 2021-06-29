import React, {useState} from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input/Botton';
import {login} from '../../acciones/aut.acciones'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

/**
* @author
* @function Login
**/

const Login = (props) => {

  const[email, setEmail] = useState('');
  const[passw, setPassword] = useState('');
  //const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();


  const clienteLogin = (e) =>{
    
    e.preventDefault();

    const cliente = {
        email, passw
    }

    dispatch(login(cliente));
  }

  if(auth.authenticate){
    return <Redirect to ={'/admin'}/>
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '100px' }}>
          <Col md={{span: 5, offset: 3}}>
            <Form onSubmit= {clienteLogin}>
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
                <Form.Check type="checkbox" label="Based?" />
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

export default Login