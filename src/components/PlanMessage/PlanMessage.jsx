import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { PlanMessageContext } from '../../context/planMessage.context'
import './PlanMessage.css'


const PlanMessage = ({ name, _id }) => {
    const { setShowMessage, showMessage } = useContext(PlanMessageContext)

    return (
        <div className='planMessage' show={showMessage} delay={3000}>
            <p>{name} quiere proponerte un plan</p>
            <div className='buttonsMessage'>
                <Link to={`/detalles-plan/${_id}`}>
                    <Button>
                        Aceptar
                    </Button>
                </Link>
                <Link to={''}>
                    <Button onClick={() => setShowMessage(false)}>
                        Cancelar
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default PlanMessage