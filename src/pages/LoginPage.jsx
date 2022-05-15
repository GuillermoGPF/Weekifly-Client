import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Brand from '../components/Brand/Brand'
import authService from '../services/auth.service'
import { AuthContext } from '../context/auth.context'
import { MessageContext } from '../context/userMessage.context'
import { ThemeContext } from '../context/theme.context'


const Loginpage = () => {
    const { setShowMessage, setMessageInfo } = useContext(MessageContext)
    const { storeToken, authenticateUser } = useContext(AuthContext)
    const { theme } = useContext(ThemeContext)

    const [loginForm, setLoginForm] = useState({
        password: '',
        email: '',
        avatar: ''
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        authService
                   .login(loginForm)
                   .then(({ data }) => {
                        storeToken(data.authToken)
                        authenticateUser() 
                        setShowMessage(true)
                        setMessageInfo({ desc: 'Sesión iniciada correctamente' })
                        navigate('/inicio')
                   })
                   .catch(err => console.log(err))
    }

    return (
        <div className={'home ' + theme}>
            <Container>
                <Form className={'forms ' + theme} onSubmit={handleSubmit}>
                    <Row className='d-flex justify-content-center align-items-center'>
                        <Col md={6}>
                            <Brand />
                            <div className='avatars'>
                                <input id='avatar1' type='radio' name='avatar' value={loginForm.avatar} onChange={handleInputChange} />
                                <label htmlFor='avatar1' className='avatar'>
                                    <img src='./../img/avatar-1.svg' alt='avatar1' />
                                </label>

                                <input id='avatar2' type='radio' name='avatar' value={loginForm.avatar} onChange={handleInputChange} />
                                <label htmlFor='avatar2' className='avatar'>
                                    <img src='./../img/avatar-2.svg' alt='avatar2' />
                                </label>

                                <input id='avatar3' type='radio' name='avatar' value={loginForm.avatar} onChange={handleInputChange} />
                                <label htmlFor='avatar3' className='avatar'>
                                    <img src='./../img/avatar-3.svg' alt='avatar3' />
                                </label>

                                <input id='avatar4' type='radio' name='avatar' value={loginForm.avatar} onChange={handleInputChange} />
                                <label htmlFor='avatar4' className='avatar'>
                                    <img src='./../img/avatar-4.svg' alt='avatar4' />
                                </label>

                                <input id='avatar5' type='radio' name='avatar' value={loginForm.avatar} onChange={handleInputChange} />
                                <label htmlFor='avatar5' className='avatar'>
                                    <img src='./../img/avatar-5.svg' alt='avatar5' />
                                </label>

                                <input id='avatar6' type='radio' name='avatar' value={loginForm.avatar} onChange={handleInputChange} />
                                <label htmlFor='avatar6' className='avatar'>
                                    <img src='./../img/avatar-6.svg' alt='avatar6' />
                                </label>
                            </div>
                        </Col>
                        <Col md={6}>
                            <p>Para iniciar sesión</p>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' name='email' value={loginForm.email} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type='password' name='password' value={loginForm.password} onChange={handleInputChange} />
                            </Form.Group>
                            
                            <Button type='submit'>Entrar</Button>
                            <Link to='/registro'>Si no tienes cuenta, regístrate aquí</Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default Loginpage