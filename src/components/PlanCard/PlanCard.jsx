import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './PlanCard.css'


const PlanCard = ({ name, image, description, _id }) => {
    return (
        <Link to={`/detalles-plan/${_id}`}>
            <Card className='plan'>
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