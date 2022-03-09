import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import userService from '../services/users.service'
import { AuthContext } from './../context/auth.context'
import { MessageContext } from '../context/userMessage.context'


const Settings = ({ refreshUser }) => {
    const { logOutUser, user } = useContext(AuthContext)
    const { setMessageInfo, setShowMessage } = useContext(MessageContext)
    
    const [editUser, setEditUser] = useState({
        username: "",
        description: "",
        email: "",
        birthday: "",
        avatar: ""
    })
    
    const [loadingImage, setLoadingImage] = useState(false)
    const { username, description, email, birthday } = editUser
    const navigate = useNavigate()
    
    const handleInputChange = e => {
        const { name, value } = e.target
        setEditUser({
            ...editUser,
            [name]: value
        })
    }

    const uploadUsernImage = e => {
        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        userService
                   .uploadImage(uploadData)
                   .then(({ data }) => {
                            setLoadingImage(false)
                            setEditUser({ ...editUser, avatar: data.cloudinary_url })
                   })
                   .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()
        userService
                   .putUser(editUser)
                   .then(({ data }) => {
                        setShowMessage(true)
                        setMessageInfo({ desc: 'Perfil modificado' })
                        refreshUser()
                        navigate('/perfil')
                   })
                   .catch(err => console.log(err))
    }


    return (
        <>
            <Navbar />
            <Container className='hero'>
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
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Nombre de Usuario</Form.Label>
                                        <Form.Control type='text' name='username' value={user.username} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control type='text' name='description' value={user.description} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='email' name='email' value={user.email} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Cumpleaños</Form.Label>
                                        <Form.Control type='date' name='birthday' value={user.birthday} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Avatar</Form.Label>
                                        <Form.Control type='file' onChange={uploadUsernImage} />
                                    </Form.Group>
                                    
                                    <Button type='submit' disabled={loadingImage}>{loadingImage ? 'Espere...' : 'Editar perfil'}</Button>
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
            <Footer />
        </>
    )
}

export default Settings