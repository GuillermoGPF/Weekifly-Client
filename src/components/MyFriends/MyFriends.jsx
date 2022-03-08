import { Row, Col } from 'react-bootstrap'
import FriendCard from '../FriendCard/FriendCard'


const MyFriends = ({ friends }) => {
    return (
        <Row>
            {friends.map(elm => {
                return <Col md={6} lg={12} key={elm._id}> <FriendCard {...elm} /> </Col>
            })}
        </Row>
    )
}

export default MyFriends