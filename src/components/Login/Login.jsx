import { Button, Form } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth.service'
import { AuthContext } from '../../context/auth.context'
import { MessageContext } from '../../context/userMessage.context'
import { ThemeContext } from '../../context/theme.context'


const Login = () => {
    const { setShowMessage, setMessageInfo } = useContext(MessageContext)
    const { storeToken, authenticateUser } = useContext(AuthContext)
    const { theme, toggleTheme } = useContext(ThemeContext)

    const [loginForm, setLoginForm] = useState({
        password: '',
        email: ''
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
        <Form className={'forms ' + theme} onSubmit={handleSubmit}>
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
        </Form>
    )
}

export default Login