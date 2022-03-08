import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import planService from '../services/plans.service'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import MyModal from '../components/MyModal/MyModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faTrashCan, faSatelliteDish } from '@fortawesome/free-solid-svg-icons'
import { MessageContext } from '../context/userMessage.context'
import { useContext } from 'react/cjs/react.development'


function PlanDetails() {
    const { setMessageInfo, setShowMessage } = useContext(MessageContext)
    const [plansDetails, setPlansDetails] = useState({})
    const { plan_id } = useParams()

    useEffect(() => {
        planService
                   .getOnePlan(plan_id)
                   .then(({ data }) => setPlansDetails(data))
                   .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate()

    const deletePlans = () => {
        planService
                   .deletePlan(plan_id)
                   .then( () => {
                        setShowMessage(true)
                        setMessageInfo({ desc: 'Plan eliminado' })
                        navigate('/inicio')
                   })
                   .catch(err => console.log(err))
    }

    return (
        <>
            <Navbar />
            <Container>
                <Link to="/planes">
                    <Button className='back'>
                        <FontAwesomeIcon icon={faAngleLeft} /> Volver
                    </Button>
                </Link>
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
                <div className='d-flex justify-content-center align-items-center'>
                    <Button onClick={deletePlans}>
                        <FontAwesomeIcon icon={faTrashCan} /> Eliminar plan
                    </Button>
                    <Button>
                        <FontAwesomeIcon icon={faSatelliteDish} /> Recomendar
                    </Button>
                </div>
            </Container>
            <MyModal />
            <Footer />
        </>
    )
}

export default PlanDetails