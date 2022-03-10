import { useContext } from 'react'
import { MessageContext } from '../../context/userMessage.context'
import { Toast } from 'react-bootstrap'
import './UserMessage.css'


const UserMessage = () => {

    const { setShowMessage, showMessage, messageInfo } = useContext(MessageContext)

    return (
        <Toast onClose={() => setShowMessage(false)} show={showMessage} delay={3000} autohide>
            <Toast.Header>
                <strong className='me-auto'>{messageInfo.title}</strong>
            </Toast.Header>
            <Toast.Body>{messageInfo.desc}</Toast.Body>
        </Toast>
    )
}

export default UserMessage