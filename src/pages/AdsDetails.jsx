import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import adService from '../services/ads.service'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faTrashCan, faSatelliteDish, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { MessageContext } from '../context/userMessage.context'
import { AuthContext } from '../context/auth.context'
import { ThemeContext } from '../context/theme.context'


function AdsDetails() {
    const { setMessageInfo, setShowMessage } = useContext(MessageContext)
    const { user } = useContext(AuthContext)
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [adsDetails, setAdsDetails] = useState({})
    const { ad_id } = useParams()

    useEffect(() => {
        adService
                 .getOneAd(ad_id)
                 .then(({ data }) => setAdsDetails(data))
                 .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate()

    const deleteAds = () => {
        adService
                 .deleteAd(ad_id)
                 .then(() => {
                    setShowMessage(true)
                    setMessageInfo({ desc: 'Anuncio eliminado' })
                    navigate('/inicio')
                 })
                 .catch(err => console.log(err))
    }

    return (
        <div className={theme}>
            <Navbar />
            <Container className='hero'>
                <div className='d-flex justify-content-between align-items-center'>
                    <Link to='/inicio'>
                        <Button className='back'>
                            <FontAwesomeIcon icon={faAngleLeft} /> Volver
                        </Button>
                    </Link>
                </div>
                
                <Row className='ads'>
                    <Col md={6} lg={4} >
                        <h2>{adsDetails.name}</h2>
                        <h3>Info del anuncio</h3>
                        <p>{adsDetails.description}</p>
                    </Col>
                    <Col md={6} lg={4} className='text-center mt-4'>
                        <img src={adsDetails.image} alt={adsDetails.name} />
                    </Col>
                </Row>

                <div className='buttonsAds'>
                    {
                        user?._id == adsDetails?.owner && 
                        <Button onClick={deleteAds}>
                            <FontAwesomeIcon icon={faTrashCan} /> Eliminar anuncio
                        </Button>
                    }
                    <Button>
                        <FontAwesomeIcon icon={faSatelliteDish} /> Recomendar
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faThumbsUp} /> Asistir
                    </Button>
                </div>
            </Container>
            <Footer />
        </div>
    )
}

export default AdsDetails