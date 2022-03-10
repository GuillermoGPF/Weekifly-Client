import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import PlanMessage from '../components/PlanMessage/PlanMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faSatellite, faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons'
import friendService from '../services/users.service'
import { MessageContext } from '../context/userMessage.context'
import { AuthContext } from '../context/auth.context'
import { PlanMessageContext } from '../context/planMessage.context'


function UserDetails() {
    const { setMessageInfo, setShowMessage } = useContext(MessageContext)
    const { user } = useContext(AuthContext)
    const [userDetails, setUserDetails] = useState({})
    const { user_id } = useParams()
const navigate = useNavigate()

    useEffect(() => {
        friendService
                     .getOneUser(user_id)
                     .then(({ data }) => setUserDetails(data))
                     .catch(err => console.log(err))
    }, [])

    const addFriend = () => {
        friendService
                     .addFriend(user_id)
                     .then(({ data }) => {
                        setShowMessage(true)
                        setMessageInfo({ desc: 'Amigo añadido' })
                        setUserDetails(data)
                        navigate('/inicio')
                     })
                     .catch(err => console.log(err))
    }

    const deleteFriend = () => {
        friendService
                     .deleteFriend(user_id)
                     .then(() => {
                        setShowMessage(true)
                        setMessageInfo({ desc: 'Amigo eliminado' })
                        navigate('/inicio')

                     })
                     .catch(err => console.log(err))
    }

    return (
        <>
            <Navbar />
            <Container className='hero'>
                <Link to='/amigos'>
                    <Button className='back'>
                        <FontAwesomeIcon icon={faAngleLeft} /> Volver
                    </Button>
                </Link>
                {
                    user?._id == userDetails?.owner && 
                    <Link to='/ajustes'>
                        <Button className='edit'>
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    </Link>
                }
                
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

                { 
                    user_id != user._id && 
                    <div className='d-flex justify-content-center align-items-center mt-5'>
                        <Button onClick={deleteFriend}>
                            <FontAwesomeIcon icon={faTrashCan} /> Eliminar amigo
                        </Button>
                        <Button onClick={addFriend}>
                            <FontAwesomeIcon icon={faSatellite} /> Añadir amigo
                        </Button>
                    </div>
                }
            </Container>
            <PlanMessage />
            <Footer />
        </>
    )
}

export default UserDetails