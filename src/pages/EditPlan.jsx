import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import planService from '../services/plans.service'
import uploadService from '../services/upload.service'
import { MessageContext } from '../context/userMessage.context'
import { ThemeContext } from '../context/theme.context'


const EditPlan = () => {
    const { setMessageInfo, setShowMessage } = useContext(MessageContext)
    const [loadingImage, setLoadingImage] = useState(false)
    const navigate = useNavigate()
    const { theme, toggleTheme } = useContext(ThemeContext)

    const { plan_id } = useParams()
    const [planEditForm, setplanEditForm] = useState({})

    useEffect(() => {
        planService
                   .getOnePlan(plan_id)
                   .then(({ data }) => setplanEditForm({
                       name: data.name,
                       description: data.description
                   }))
                   .catch(err => console.log(err))
    }, [])

    const {name, description} = planEditForm

    const handleInputChange = e => {
        const { name, value } = e.target
        setplanEditForm({
            ...planEditForm,
            [name]: value
        })
    }

    const uploadUserImage = e => {
        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadService
                     .uploadImage(uploadData)
                     .then(({ data }) => {
                            setLoadingImage(false)
                            setplanEditForm({ ...planEditForm, image: data.cloudinary_url })
                     })
                     .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()
        planService
                   .putPlan(plan_id, planEditForm)
                   .then(({ data }) => {
                        setShowMessage(true)
                        setMessageInfo({ desc: 'Plan modificado' })
                        navigate(`/detalles-plan/${plan_id}`)
                        setplanEditForm(data)
                   })
                   .catch(err => console.log(err))
    }


    return (
        <div className={theme}>
            <Navbar />
            <Container className='hero'>
                <Row className='justify-content-center'>
                    <Col lg={6}>
                        <Card>
                            <Card.Body>
                                <Link to={`/detalles-plan/${plan_id}`}>
                                    <Button className='back'>
                                        <FontAwesomeIcon icon={faAngleLeft} /> Volver
                                    </Button>
                                </Link>
                                <Card.Title><h2>Edita tu plan</h2></Card.Title>
                                <Form onSubmit={handleSubmit}>  
                                    <Form.Group>
                                        <Form.Label>Escribe el nombre del Plan</Form.Label>
                                        <Form.Control type='text' name='name' value={name} onChange={handleInputChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Pon una descripción</Form.Label>
                                        <Form.Control type='text' name='description' value={description} onChange={handleInputChange}/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Avatar</Form.Label>
                                        <Form.Control type='file' onChange={uploadUserImage} />
                                    </Form.Group>

                                    <Button type='submit' disabled={loadingImage}>{loadingImage ? 'Espere...' : 'Editar plan'}</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default EditPlan