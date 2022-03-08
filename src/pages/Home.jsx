import { Card, Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import MyModal from '../components/MyModal/MyModal'
import MyPlans from '../components/MyPlans/MyPlans'
import MyFriends from '../components/MyFriends/MyFriends'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import friendService from '../services/users.service'
import planService from '../services/plans.service'
import { AuthContext } from '../context/auth.context'
import { useState, useEffect, useContext } from 'react'


const Home = () => {
    const { user } = useContext(AuthContext)

    const [friends, setFriends] = useState([])
    const [plans, setPlans] = useState([])

    useEffect(() => loadFriends(), [])
    useEffect(() => loadPlans(), [])

    const loadFriends = () => {
        friendService
            .getAllUsers()
            .then(({ data }) => setFriends(data))
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
            <Container>
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
                                {!friends.length ? <LoadingSpinner /> : <MyFriends friends={friends} />}
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
            <MyModal />
            <Footer />
        </>
    )
}

export default Home