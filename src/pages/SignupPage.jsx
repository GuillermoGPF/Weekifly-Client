import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Brand from '../components/Brand/Brand'
import Signup from '../components/Signup/Signup'


const SignupPage = () => {
    return (
        <div className='home'>
            <Container>
                <Row className='d-flex justify-content-center align-items-center'>
                    <Col md={6}>
                        <Brand></Brand>
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