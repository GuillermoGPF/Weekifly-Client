import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../../context/theme.context'
import './PlanCard.css'


const PlanCard = ({ name, image, description, _id }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <Link to={`/detalles-plan/${_id}`}>
            <Card className={'plan ' + theme}>
                <Card.Img variant='top' src={image} alt={name} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card >
        </Link>
    )
}

export default PlanCard