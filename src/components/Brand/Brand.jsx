import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import './Brand.css'


const Brand = () => {
    return (
        <h1 className='brand'>
            <FontAwesomeIcon icon={faRocket} /> Weekifly
        </h1>
    )
}

export default Brand