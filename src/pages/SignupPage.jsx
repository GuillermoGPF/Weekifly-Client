import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Brand from '../components/Brand/Brand'
import Signup from '../components/Signup/Signup'
import { ThemeContext } from '../context/theme.context'


const SignupPage = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={'home ' + theme}>
            <Container>
                <Row className='align-items-center'>
                    <Col md={6}>
                        <Brand />
                        <div className='avatars'>
                            <div className='avatar'>
                                <img src='./../img/avatar-1.svg'></img>
                            </div>
                            <div className='avatar'>
                                <img src='./../img/avatar-2.svg'></img>
                            </div>
                            <div className='avatar'>
                                <img src='./../img/avatar-3.svg'></img>
                            </div>
                            <div className='avatar'>
                                <img src='./../img/avatar-4.svg'></img>
                            </div>
                            <div className='avatar'>
                                <img src='./../img/avatar-5.svg'></img>
                            </div>
                            <div className='avatar'>
                                <img src='./../img/avatar-6.svg'></img>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Signup />
                        <Link to='/'>Si tienes cuenta, inicia sesión aquí</Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SignupPage