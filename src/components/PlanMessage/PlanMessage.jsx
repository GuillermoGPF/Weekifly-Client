import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './PlanMessage.css'


const PlanMessage = ({ name, _id }) => {
    return (
        <div className='planMessage'>
            <p>{name} quiere proponerte un plan</p>
            <div className='buttonsMessage'>
                <Link to={`/detalles-plan/${_id}`}>
                    <Button>
                        Aceptar
                    </Button>
                </Link>
                <Link to={''}>
                    <Button>
                        Cancelar
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default PlanMessage