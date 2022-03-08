import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import MyModal from '../components/MyModal/MyModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import userService from '../services/users.service'
import { AuthContext } from './../context/auth.context'
import { MessageContext } from '../context/userMessage.context'


const Settings = () => {
    const { logOutUser } = useContext(AuthContext)
    const { setMessageInfo, setShowMessage } = useContext(MessageContext)
    
    const [editUser, setEditUser] = useState({
        username: "",
        description: "",
        email: "",
        birthday: ""
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setEditUser({
            ...editUser,
            [name]: value
        })
    }
    
    const { user_id } = useParams()

    const navigate = useNavigate()

    const editProfile = () => {
        userService
                   .putUser(user_id)
                   .then( () => {
                        setShowMessage(true)
                        setMessageInfo({ desc: 'Perfil editado con éxito' })
                        navigate('/perfil')
                   })
                   .catch(err => console.log(err))
    }

    return (
        <>
            <Navbar />
            <Container>
                <Row className='justify-content-center'>
                    <Col lg={6}>
                        <Card>
                            <Card.Body>
                                <Link to="/perfil">
                                    <Button className='back'>
                                        <FontAwesomeIcon icon={faAngleLeft} /> Volver
                                    </Button>
                                </Link>
                                <Card.Title><h2>Ajustes del perfil</h2></Card.Title>
                                <Form onSubmit={editProfile}>
                                    <Form.Group>
                                        <Form.Label>Nombre de Usuario</Form.Label>
                                        <Form.Control type='text' name='username' value={editUser.username} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control type='text' name='description' value={editUser.description} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='email' name='email' value={editUser.email} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Cumpleaños</Form.Label>
                                        <Form.Control type='date' name='birthday' value={editUser.birthday} onChange={handleInputChange} />
                                    </Form.Group>
                                    
                                    <Button type='submit'>Editar perfil</Button>
                                </Form>
                                <hr />
                                <div className='text-center'>
                                    <Button onClick={logOutUser} className='button'>
                                        <FontAwesomeIcon icon={faPowerOff} />
                                        <p>Cerrar Sesión</p>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <MyModal />
            <Footer />
        </>
    )
}

export default Settings