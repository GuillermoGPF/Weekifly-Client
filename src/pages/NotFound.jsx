import { Col, Container, Row } from 'react-bootstrap'
import { useContext } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { ThemeContext } from '../context/theme.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'


const Settings = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <div className={theme}>
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
            <Footer />
        </div>
    )
}

export default Settings