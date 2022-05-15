import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faTrashCan, faSatelliteDish, faEdit, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import planService from '../services/plans.service'
import { MessageContext } from '../context/userMessage.context'
import { AuthContext } from '../context/auth.context'
import { ThemeContext } from '../context/theme.context'


function PlanDetails() {
    const { setMessageInfo, setShowMessage } = useContext(MessageContext)
    const { user } = useContext(AuthContext)
    const { theme } = useContext(ThemeContext)
    const [plansDetails, setPlansDetails] = useState({})
    const { plan_id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        planService
                   .getOnePlan(plan_id)
                   .then(({ data }) => setPlansDetails(data))
                   .catch(err => console.log(err))
    }, [])

    const deletePlans = () => {
        planService
                   .deletePlan(plan_id)
                   .then(() => {
                        setShowMessage(true)
                        setMessageInfo({ desc: 'Plan eliminado' })
                        navigate('/inicio')
                   })
                   .catch(err => console.log(err))
    }

    return (
        <div className={theme}>
            <Navbar />
            <Container className='hero'>
                <div className='d-flex justify-content-between align-items-center'>
                    <Link to='/planes'>
                        <Button className='back'>
                            <FontAwesomeIcon icon={faAngleLeft} /> Volver
                        </Button>
                    </Link>
                    <Link to={`/editar-plan/${plan_id}`}>
                        <Button className='edit'>
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    </Link>
                </div>
                
                <Row className='plans'>
                    <Col md={6} lg={4} >
                        <h2>{plansDetails.name}</h2>
                        <h3>Info del plan</h3>
                        <p>{plansDetails.description}</p>
                    </Col>
                    <Col md={6} lg={4} className='text-center mt-4'>
                        <img src={plansDetails.image} alt={plansDetails.name} />
                    </Col>
                </Row>

                <div className='buttonsPlans'>
                    {
                        user?._id == plansDetails?.owner && 
                        <Button onClick={deletePlans}>
                            <FontAwesomeIcon icon={faTrashCan} /> Eliminar plan
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

export default PlanDetails