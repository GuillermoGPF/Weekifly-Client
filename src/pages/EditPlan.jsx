import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { useContext, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
// import userService from '../services/users.service'
// import { AuthContext } from './../context/auth.context'
// import { MessageContext } from '../context/userMessage.context'


const EditPlan = ({ _id }) => {

    return (
        <>
            <Navbar />
            <Container className='hero'>
                <Row className='justify-content-center'>
                    <Col lg={6}>
                        <Card>
                            <Card.Body>
                                <Link to={`/detalles-plan/${_id}`}>
                                    <Button className='back'>
                                        <FontAwesomeIcon icon={faAngleLeft} /> Volver
                                    </Button>
                                </Link>
                                <Card.Title><h2>Edita tu plan</h2></Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Escribe el nombre del Plan</Form.Label>
                                        <Form.Control type='text' name='name' />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Pon una descripción</Form.Label>
                                        <Form.Control type='text' name='description' />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Elige una imagen para el plan</Form.Label>
                                        <Form.Control type='file' />
                                    </Form.Group>
                                    
                                    <Button type='submit'>Editar plan</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default EditPlan