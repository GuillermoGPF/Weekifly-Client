import { useState } from 'react'
// const URL = 'http://localhost:3000/api/messages'


const MessageBoard = () => {
    const [chat, setChat] = useState([])

    const [message, setMessage] = useState({
        messages: '',
        messageList: []
    })

    const componentDidMount = () => {
        message
        .then((res) => res.json())
        .then(({ data, res }) => {
            setMessage({
                messages: res,
                data
            })
        }) 
        .catch(err => console.log(err))
    }
    
    return (
        <div>
            <h6>Guest Messages</h6>
            {
                chat.map(elm => {
                    return (
                        <div key={elm._id}>
                            <h3> {elm.message} </h3>
                            <h2> - {elm.name} </h2>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MessageBoard