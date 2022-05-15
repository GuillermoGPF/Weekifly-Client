import { Button, Form } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PlanService from '../../services/plans.service'
import uploadService from '../../services/upload.service'
import { MessageContext } from '../../context/userMessage.context'
import { ThemeContext } from '../../context/theme.context'


const PlanForm = ({ closeModal, refreshPlans }) => {
    const { setShowMessage, setMessageInfo } = useContext(MessageContext)
    const { theme } = useContext(ThemeContext)

    const [planData, setPlanData] = useState({
        name: '',
        description: '',
        image: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const { name, description } = planData
    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setPlanData({
            ...planData,
            [name]: value
        })
    }

    const uploadPlanImage = e => {
        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadService
                     .uploadImage(uploadData)
                     .then(({ data }) => {
                            setLoadingImage(false)
                            setPlanData({ ...planData, image: data.cloudinary_url })
                     })
                     .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()
        PlanService
                   .createPlan(planData)
                   .addPlan(planData)
                   .then(({ data }) => {
                        setShowMessage(true)
                        setMessageInfo({ desc: 'Plan creado con éxito' })
                        refreshPlans()
                        closeModal()
                        setPlanData(data)
                        navigate('/inicio')
                   })
                   .catch(err => console.log(err))
    }

    return (
        <div className={'form ' + theme}>
            <h2>Crea y añade tu plan</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Escribe el nombre del Plan</Form.Label>
                    <Form.Control type='text' name='name' value={name} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Pon una descripción</Form.Label>
                    <Form.Control type='text' name='description' value={description} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Elige una imagen para el plan</Form.Label>
                    <Form.Control type='file' onChange={uploadPlanImage} />
                </Form.Group>
                
                <Button type='submit' disabled={loadingImage}>{loadingImage ? 'Espere...' : 'Lanzar plan'}</Button>
            </Form>
        </div>
    )
}

export default PlanForm