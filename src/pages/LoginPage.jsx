import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Brand from '../components/Brand/Brand'
import Login from '../components/Login/Login'


const Loginpage = () => {
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
                        <Login />
                        <Link to='/registro'>Si no tienes cuenta, regístrate aquí</Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Loginpage