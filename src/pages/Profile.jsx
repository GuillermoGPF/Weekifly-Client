import { Button, Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import MyModal from '../components/MyModal/MyModal'
import { AuthContext } from './../context/auth.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


const Profile = () => {
    const { user } = useContext(AuthContext)

    return (
        <>
            <Navbar />
            <Container>
                <Link to="/ajustes">
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
            <MyModal />
            <Footer />
        </>
    )
}

export default Profile