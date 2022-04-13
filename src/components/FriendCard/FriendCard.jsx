import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../../context/theme.context'
import './FriendCard.css'


const FriendCard = ({ username, avatar, _id }) => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <Link to={`/detalles-amigo/${_id}`}>
            <Card className={'friend ' + theme}>
                <Card.Img variant='top' src={avatar} alt={username} />
                <Card.Body>
                    <Card.Title>{username}</Card.Title>
                </Card.Body>
            </Card >
        </Link>
    )
}

export default FriendCard