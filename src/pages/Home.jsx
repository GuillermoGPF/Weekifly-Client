import { Card, Col, Container, Row } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import MyPlans from '../components/MyPlans/MyPlans'
import FriendCard from '../components/FriendCard/FriendCard'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import friendService from '../services/users.service'
import planService from '../services/plans.service'
import { AuthContext } from '../context/auth.context'


const Home = () => {
    const { user } = useContext(AuthContext)

    const [friends, setFriends] = useState([])
    const [plans, setPlans] = useState([])

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
                   .getAllPlans()
                   .then(({ data }) => setPlans(data))
                   .catch(err => console.log(err))
    }


    return (
        <>
            <Navbar />
            <Container className='hero'>
                <Row>
                    <Col>
                        <h2>Bienvenid@ {user.username}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title><h3>Mis amigos</h3></Card.Title>
                                <div className='homeCard'>
                                    {
                                        !friends ? <LoadingSpinner /> :
                                        friends && friends.map(elm => {
                                            return (
                                                <Row>
                                                    <Col md={6} lg={12} key={elm._id}> <FriendCard {...elm} /> </Col>
                                                </Row>
                                            )
                                        })
                                    }
                                    
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title><h3>Mis planes</h3></Card.Title>
                                <div className='homeCard'>        
                                    {!plans.length ? <LoadingSpinner /> : <MyPlans plans={plans} />}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Home