import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import MyModal from '../components/MyModal/MyModal'
import FriendsList from '../components/FriendsList/FriendsList'
import SearchFriends from './../components/SearchFriends/SearchFriends'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import friendService from '../services/users.service'
import { useState, useEffect } from 'react'


const Users = () => {
    const [friends, setFriends] = useState([])
    const [friendsCopy, setCopy] = useState([])

    useEffect(() => loadFriends(), [])

    const loadFriends = () => {
        friendService
                     .getAllUsers()
                     .then(({ data }) => setFriends(data))
                     .catch(err => console.log(err))
    }

    function filterFriends(str, filteredFriends) {
        str ? filteredFriends = friendsCopy.filter(elm => elm.name.includes(str)) : filteredFriends = setCopy
        setFriends(filteredFriends)
    }

    return (
        <>
            <Navbar />
            <Container>
                <Row>
                    <Col>
                        <h2>Amigos</h2>
                    </Col>
                </Row>
                <SearchFriends filterFriends={filterFriends} />
                {!friends.length ? <LoadingSpinner /> : <FriendsList friends={friends} />}
            </Container>
            <MyModal />
            <Footer />
        </>
    )
}

export default Users