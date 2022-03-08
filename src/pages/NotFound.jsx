import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import MyModal from '../components/MyModal/MyModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'


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
            <MyModal />
            <Footer />
        </>
    )
}

export default Settings