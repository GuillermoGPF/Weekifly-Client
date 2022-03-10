import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import PlanMessage from '../components/PlanMessage/PlanMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import { PlanMessageContext } from '../context/planMessage.context'


const Settings = () => {
    return (
        <>
            <Navbar />
            <Container className='notFound'>
                <Row>
                    <Col>
                        <h2>404</h2>
                        <h3>Not Found</h3>
                    </Col>
                </Row>
                <FontAwesomeIcon className='rocket' icon={faRocket} />
            </Container>
            <PlanMessage />
            <Footer />
        </>
    )
}

export default Settings