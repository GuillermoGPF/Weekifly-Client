import { Col, Container, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import FriendsList from '../components/FriendsList/FriendsList'
import SearchFriends from './../components/SearchFriends/SearchFriends'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import friendService from '../services/users.service'


const Users = () => {
    const [friends, setFriends] = useState([])
    const [friendsCopy, setCopy] = useState([])

    useEffect(() => loadFriends(), [])

    const loadFriends = () => {
        friendService
                     .getAllUsers()
                     .then(({ data }) => {
                         setFriends(data)
                         setCopy(data)
                     })
                     .catch(err => console.log(err))
    }

    function filterFriends(str) {
        let filteredFriends
        str ? filteredFriends = friendsCopy.filter(elm => elm.username.includes(str))
            : filteredFriends = friendsCopy
        setFriends(filteredFriends)
    }

    return (
        <>
            <Navbar />
            <Container className='hero'>
                <Row>
                    <Col>
                        <h2>Amigos</h2>
                    </Col>
                </Row>
                <SearchFriends filterFriends={filterFriends} />
                {!friends.length ? <LoadingSpinner /> : <FriendsList friends={friends} />}
            </Container>
            <Footer />
        </>
    )
}

export default Users