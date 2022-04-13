import { Card, Col, Container, Row, Modal } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import AdForm from '../components/AdForm/AdForm'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import PlanCard from '../components/PlanCard/PlanCard'
import FriendCard from '../components/FriendCard/FriendCard'
import AdCard from '../components/AdCard/AdCard'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import friendService from '../services/users.service'
import planService from '../services/plans.service'
import adService from '../services/ads.service'
import { AuthContext } from '../context/auth.context'
import { ThemeContext } from '../context/theme.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleAd } from '@fortawesome/free-solid-svg-icons'


const Home = ({ name, image, description, _id }) => {
    const { user } = useContext(AuthContext)

    const [friends, setFriends] = useState([])
    const [plans, setPlans] = useState([])
    const [ads, setAds] = useState([])
    const [show, setShow] = useState(false)
    const { theme, toggleTheme } = useContext(ThemeContext)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => loadFriends(), [])
    useEffect(() => loadPlans(), [])

    const loadFriends = () => {
        friendService
                     .getOneUser(user._id)
                     .then(({ data }) => setFriends(data.friends))
                     .catch(err => console.log(err))
    }

    const loadPlans = () => {
        planService
                   .getAllPlans(plans._id)
                   .then(({ data }) => setPlans(data))
                   .catch(err => console.log(err))
    }

    const loadAds = () => {
        adService
                 .getAllAds(ads._id)
                 .then(({ data }) => setAds(data))
                 .catch(err => console.log(err))
    }

    return (
        <div className={theme}>
            <Navbar />
            <Container className='hero'>
                <Row>
                    <Col className='d-flex flex-wrap justify-content-between align-items-center'>
                        <h2>Bienvenid@ {user.username}</h2>   
                        <Link className='create-ad' to='' onClick={handleShow}>
                            <FontAwesomeIcon icon={faRectangleAd} />
                            Crear Anuncio
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className={'advert ' + theme}>
                            <Card.Body>
                                <h3>Anuncios</h3>
                                <FontAwesomeIcon icon={faRectangleAd} />
                                {
                                    !ads ? <LoadingSpinner /> : 
                                    <div className='homeCard'> 
                                        <Row>
                                            {
                                                ads && ads.map(elm => {
                                                    return (
                                                        <Col key={elm._id}> 
                                                            <AdCard {...elm} />
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </div>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={'advert ' + theme}>
                            <Card.Body>
                                <h3>Anuncios</h3>
                                <FontAwesomeIcon icon={faRectangleAd} />
                                {
                                    !ads ? <LoadingSpinner /> : 
                                    <div className='homeCard'> 
                                        <Row>
                                            {
                                                ads && ads.map(elm => {
                                                    return (
                                                        <Col key={elm._id}> 
                                                            <AdCard {...elm} />
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </div>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <Card className={theme}>
                            <Card.Body>
                                <h3>Mis amigos</h3>
                                {
                                    !friends ? <LoadingSpinner /> : 
                                    <div className='homeCard'> 
                                        <Row>
                                            {
                                                friends && friends.map(elm => {
                                                    return (
                                                        <Col key={elm._id} md={6} lg={12} xl={6}> 
                                                            <FriendCard {...elm} />
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </div>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card className={theme}>
                            <Card.Body>
                                <h3>Mis planes</h3>
                                {
                                    !plans ? <LoadingSpinner /> : 
                                    <div className='homeCard'> 
                                        <Row>
                                            {
                                                plans && plans.map(elm => {
                                                    return (
                                                        <Col key={elm._id} sm={6} xl={4}> 
                                                            <PlanCard {...elm} />
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </div>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
    
            <Modal contentClassName={theme} show={show} onHide={handleClose} centered>
                <Modal.Header closeButton />
                <Modal.Body>
                    <AdForm closeModal={handleClose} refreshAd={loadAds} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Home