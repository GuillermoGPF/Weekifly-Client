import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../../context/theme.context'
import './AdCard.css'


const AdCard = ({ name, image, description, _id }) => {
    const { theme } = useContext(ThemeContext)

    return (
        <Link to={`/detalles-anuncio/${_id}`}>
            <div className={'ad ' + theme}>
                <img src={image} alt={name} />
                <div className='d-flex flex-column justify-content-center align-items-start'>
                    <h5>{name}</h5>
                    <p>{description}</p>
                </div>
            </div >
        </Link>
    )
}

export default AdCard