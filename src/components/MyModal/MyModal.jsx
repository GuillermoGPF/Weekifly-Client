import PlanForm from '../PlanForm/PlanForm'
import './MyModal.css'


const MyModal = () => {
    return (
        <div className='modal fade' id='modal' aria-labelledby='modalLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-body'>
                        <PlanForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyModal