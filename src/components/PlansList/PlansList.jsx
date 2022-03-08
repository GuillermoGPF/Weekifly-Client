import { Row, Col, Card } from 'react-bootstrap'
import PlanCard from '../PlanCard/PlanCard'


const PlansList = ({ plans }) => {
    return (
        <Row>
            {plans.map(elm => {
                return <Col sm={6} md={4} lg={3} key={elm._id}> <PlanCard {...elm} /> </Col>
            })}
        </Row>
    )
}

export default PlansList