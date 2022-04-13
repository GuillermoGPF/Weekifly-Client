import { Container, Button, Card } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import PlansList from '../components/PlansList/PlansList'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faSatellite, faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons'
import friendService from '../services/users.service'
import planService from '../services/plans.service'
import { MessageContext } from '../context/userMessage.context'
import { AuthContext } from '../context/auth.context'
import { ThemeContext } from '../context/theme.context'


function UserDetails() {
    const { setMessageInfo, setShowMessage } = useContext(MessageContext)
    const { user } = useContext(AuthContext)
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [userDetails, setUserDetails] = useState({})
    const [plans, setPlans] = useState([])
    const { user_id } = useParams()
    const navigate = useNavigate()

    useEffect(() => loadPlans(), [])

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

    const loadPlans = () => {
        planService
                   .getAllPlans()
                   .then(({ data }) => {
                        setPlans(data)
                   })
                   .catch(err => console.log(err))
    }

    return (
        <div className={theme}>
            <Navbar />
            <Container className='hero'>
                <Card className={theme}>
                    <Card.Body>
                        <div className='d-flex justify-content-between align-items-center'>
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
                        </div>
                        <h3>Mi perfil</h3>
                        <div className='profile'>
                            <img src={userDetails.avatar} alt={userDetails.username} />
                            <div className='d-flex flex-column justify-content-center align-items-start'>
                                <h2>{userDetails.username}</h2>
                                <h3>Sobre mí</h3>
                                <p>{userDetails.description}</p>
                                <h3>Cumpleaños</h3>
                                <p>{userDetails.birthday}</p>
                            </div>
                        </div>
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
                    </Card.Body>
                </Card>

                <Card className={theme}>
                    <Card.Body>
                        <h3>Mis planes</h3>
                        {
                            !plans.length ? <LoadingSpinner /> : 
                            <PlansList plans={plans} />
                        }
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </div>
    )
}

export default UserDetails