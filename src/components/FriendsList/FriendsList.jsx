import { Row, Col } from 'react-bootstrap'
import FriendCard from '../FriendCard/FriendCard'


const FriendsList = ({ friends }) => {
    return (
        <Row>
            {friends.map(elm => {
                return <Col md={6} lg={5} xl={3} key={elm._id}> <FriendCard {...elm} /> </Col>
            })}
        </Row>
    )
}

export default FriendsList