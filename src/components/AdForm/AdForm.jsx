import { Button, Form } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AdService from '../../services/ads.service'
import uploadService from '../../services/upload.service'
import { MessageContext } from '../../context/userMessage.context'
import { ThemeContext } from '../../context/theme.context'


const AdForm = ({ closeModal, refreshAd }) => {
    const { setShowMessage, setMessageInfo } = useContext(MessageContext)
    const { theme } = useContext(ThemeContext)

    const [AdData, setAdData] = useState({
        name: '',
        description: '',
        image: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const { name, description } = AdData
    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setAdData({
            ...AdData,
            [name]: value
        })
    }

    const uploadAdImage = e => {
        setLoadingImage(true)
        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])
        uploadService
                     .uploadImage(uploadData)
                     .then(({ data }) => {
                            setLoadingImage(false)
                            setAdData({ ...AdData, image: data.cloudinary_url })
                     })
                     .catch(err => console.log(err))
    }

    const handleSubmit = e => {
        e.preventDefault()
        AdService
                 .createAd(AdData)
                 .then(({ data }) => {
                    setShowMessage(true)
                    setMessageInfo({ desc: 'Anuncio creado con éxito' })
                    refreshAd()
                    closeModal()
                    setAdData(data)
                    navigate('/inicio')
                 })
                 .catch(err => console.log(err))
    }

    return (
        <div className={'form ' + theme}>
            <h2>Crea tu anuncio</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Título del anuncio</Form.Label>
                    <Form.Control type='text' name='name' value={name} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Añade la descripción</Form.Label>
                    <Form.Control type='text' name='description' value={description} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Elige una imagen para posicionarte</Form.Label>
                    <Form.Control type='file' onChange={uploadAdImage} />
                </Form.Group>
                
                <Button type='submit' disabled={loadingImage}>{loadingImage ? 'Espere...' : 'Lanzar anuncio'}</Button>
            </Form>
        </div>
    )
}

export default AdForm