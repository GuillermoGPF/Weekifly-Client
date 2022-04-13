import { useContext } from 'react'
import { Toast } from 'react-bootstrap'
import { MessageContext } from '../../context/userMessage.context'
import { ThemeContext } from '../../context/theme.context'
import './UserMessage.css'


const UserMessage = () => {
    const { setShowMessage, showMessage, messageInfo } = useContext(MessageContext)
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <Toast className={theme} onClose={() => setShowMessage(false)} show={showMessage} delay={5000} autohide>
            <Toast.Body>{messageInfo.desc}</Toast.Body>
        </Toast>
    )
}

export default UserMessage