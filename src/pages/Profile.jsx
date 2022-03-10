import { Button, Col, Container, Row } from 'react-bootstrap'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import PlanMessage from '../components/PlanMessage/PlanMessage'
import { AuthContext } from './../context/auth.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { PlanMessageContext } from '../context/planMessage.context'


const Profile = () => {
    const { user } = useContext(AuthContext)

    return (
        <>
            <Navbar />
            <Container className='hero'>
                <Link to='/ajustes'>
                    <Button className='edit'>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </Link>
                <Row className='profile'>
                    <Col md={6} lg={4} className='text-center mt-4'>
                        <img src={user.avatar} alt={user.username} />
                    </Col>
                    <Col md={6} lg={4}>
                        <h2>{user.username}</h2>
                        <h3>Sobre mí</h3>
                        <p>{user.description}</p>
                        <h3>Cumpleaños</h3>
                        <p>{user.birthday}</p>
                    </Col>
                </Row>
            </Container>
            <PlanMessage />
            <Footer />
        </>
    )
}

export default Profile