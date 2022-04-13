import { Button, Form } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth.service'
import { MessageContext } from '../../context/userMessage.context'
import { ThemeContext } from '../../context/theme.context'


const Signup = () => {
    const { setMessageInfo, setShowMessage } = useContext(MessageContext)
    const { theme, toggleTheme } = useContext(ThemeContext)

    const [signupForm, setSignupForm] = useState({
        username: '',
        password: '',
        email: '',
        birthday: ''
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { name, value } = e.target
        setSignupForm({
            ...signupForm,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        authService
                   .signup(signupForm)
                   .then(({ data }) => {
                        setShowMessage(true)
                        setMessageInfo({ desc: 'Te has registrado correctamente' })
                        navigate('/inicio')
                   })
                   .catch(err => console.log(err))
    }

    return (
        <Form className={'forms ' + theme} onSubmit={handleSubmit}>
            <p>Para crearte una cuenta</p>
            <Form.Group>
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control type='text' name='username' value={signupForm.username} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' name='email' value={signupForm.email} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type='password' name='password' value={signupForm.password} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Cumpleaños (Opcional)</Form.Label>
                <Form.Control type='date' name='birthday' value={signupForm.birthday} onChange={handleInputChange} />
            </Form.Group>
            
            <Button type='submit'>Empezar</Button>
        </Form>
    )
}

export default Signup