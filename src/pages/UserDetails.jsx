import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import friendService from '../services/users.service'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import MyModal from '../components/MyModal/MyModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faSatellite } from '@fortawesome/free-solid-svg-icons'


function UserDetails() {
    const [userDetails, setUserDetails] = useState({})
    const { user_id } = useParams()

    useEffect(() => {
        friendService
                     .getOneUser(user_id)
                     .then(({ data }) => setUserDetails(data))
                     .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Navbar />
            <Container>
                <Link to="/amigos">
                    <Button className='back'>
                        <FontAwesomeIcon icon={faAngleLeft} /> Volver
                    </Button>
                </Link>
                <Row className='profile'>
                    <Col md={6} lg={4} className='text-center mt-4'>
                        <img src={userDetails.avatar} alt={userDetails.username} />
                    </Col>
                    <Col md={6} lg={4}>
                        <h2>{userDetails.username}</h2>
                        <h3>Sobre mí</h3>
                        <p>{userDetails.description}</p>
                        <h3>Cumpleaños</h3>
                        <p>{userDetails.birthday}</p>
                    </Col>
                </Row>
                <div className='d-flex justify-content-center align-items-center'>
                    <Button>
                        <FontAwesomeIcon icon={faSatellite} /> Añadir amigo
                    </Button>
                </div>
            </Container>
            <MyModal />
            <Footer />
        </>
    )
}

export default UserDetails