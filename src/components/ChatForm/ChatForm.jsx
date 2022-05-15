import { useState } from 'react'

const URL = 'http://localhost:3000/api/messages'

const ChatForm = () => {
    const [chat, setChat] = useState({
        name: '',
        message: '',
    })

    const { name, message } = chat
    
    const handleInputChange = e => {
        const { value, name } = e.target
        setChat({
            ...chat,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch(URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            message
        }),
        })
        .then((res) => {
            if (res.status === 200) {
                setChat({
                    name: '',
                    message: '',
                })
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='guestbookDiv'>
            <form onSubmit={handleSubmit} className='guestBookForm'>
                <label htmlFor='' className='guestlabel'>What 's your name?</label>
                <input type='text' name='name' onChange={handleInputChange} value={name} />
                <label className='guestlabel' htmlFor=''>
                    Leave a nice message:
                </label>
                <textarea type='text' name='message' value={message} onChange={handleInputChange} />
                <button type='submit' value='Submit'>
                    Submit Message
                </button>
            </form>
        </div>
    )
}

export default ChatForm