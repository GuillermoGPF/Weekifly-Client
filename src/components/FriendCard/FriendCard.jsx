import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './FriendCard.css'


const FriendCard = ({ username, avatar, _id }) => {
    return (
        <Link to={`/detalles-amigo/${_id}`}>
            <Card className='friend'>
                <Card.Img variant='top' src={avatar} alt={username} />
                <Card.Body>
                    <Card.Title>{username}</Card.Title>
                </Card.Body>
            </Card >
        </Link>
    )
}

export default FriendCard