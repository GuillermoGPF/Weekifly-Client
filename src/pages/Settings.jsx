import { Button, Card, Col, Container, Form, Row, Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import userService from '../services/users.service'
import uploadService from '../services/upload.service'
import { AuthContext } from './../context/auth.context'
import { ThemeContext } from '../context/theme.context'
import { MessageContext } from '../context/userMessage.context'


const Settings = () => {
    const { user, setUser } = useContext(AuthContext)
    const { setMessageInfo, setShowMessage } = useContext(MessageContext)
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [loadingImage, setLoadingImage] = useState(false)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    const [editUser, setEditUser] = useState({})
    
    useEffect(() => {
        userService
                   .getOneUser(user._id)
                   .then(({ data }) => setEditUser({
                        username: data.username,
                        description: data.description,
                        email: data.email,
                        birthday: data.birthday
                   }))
                   .catch(err => console.log(err))
    }, [])
    
    const { username, description, email, birthday } = editUser
    const handleInputChange = e => {
        const { name, value } = e.target
        setEditUser({
            ...editUser,
            [name]: value
        })
    }

    const uploadUserImage = e => {
        setLoadingImage(true)
        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])
        uploadService
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
                   .putUser(user._id, editUser)
                   .then(({ data }) => {
                        setShowMessage(true)
                        setMessageInfo({ desc: 'Perfil modificado' })
                        navigate('/perfil')
                        setUser(data)
                   })
                   .catch(err => console.log(err))
    }

    const deleteUser = () => {
        userService
                   .deleteUser(user._id)
                   .then(() => {
                        setShowMessage(true)
                        setMessageInfo({ desc: 'Has eliminado tu cuenta' })
                        navigate('/')
                   })
                   .catch(err => console.log(err))
    }


    return (
        <div className={theme}>
            <Navbar />
            <Container className='hero'>
                <Row className='justify-content-center'>
                    <Col lg={6}>
                        <Card className={theme}>
                            <Card.Body>
                                <Link to='/perfil'>
                                    <Button className='back'>
                                        <FontAwesomeIcon icon={faAngleLeft} /> Volver
                                    </Button>
                                </Link>
                                <Card.Title><h2>Ajustes del perfil</h2></Card.Title>
                                {
                                    editUser && <Form onSubmit={handleSubmit}>
                                        <Form.Group>
                                            <Form.Label>Nombre de Usuario</Form.Label>
                                            <Form.Control type='text' name='username' value={username} onChange={handleInputChange} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Descripción</Form.Label>
                                            <Form.Control type='text' name='description' value={description} onChange={handleInputChange} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type='email' name='email' value={email} onChange={handleInputChange} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Cumpleaños</Form.Label>
                                            <Form.Control type='date' name='birthday' value={birthday} onChange={handleInputChange} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Avatar</Form.Label>
                                            <Form.Control type='file' onChange={uploadUserImage} />
                                        </Form.Group>
                                        
                                        <Button type='submit' disabled={loadingImage}>{loadingImage ? 'Espere...' : 'Editar perfil'}</Button>
                                        <Button className='bttn' onClick={handleShow}>Eliminar perfil</Button>
                                    </Form>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
    
            <Modal contentClassName={theme} show={show} onHide={handleClose} centered>
                <Modal.Header closeButton />
                <Modal.Body>
                    <h4 className='text-center'>¿Quieres eliminar tu cuenta en Weekifly?</h4>
                    <div className='d-flex justify-content-around align-items-center'>
                        <Button className='bttn' onClick={deleteUser}>Sí, por favor</Button>
                        <Button onClick={handleClose}>Me lo pensaré</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Settings