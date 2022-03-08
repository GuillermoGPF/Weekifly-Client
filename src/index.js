import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from '../src/context/auth.context';
import App from './App'
import { MessageProviderWrapper } from '../src/context/userMessage.context'

ReactDOM.render(
    <Router>
        <AuthProviderWrapper>
            <MessageProviderWrapper>
                <App />
            </MessageProviderWrapper>
        </AuthProviderWrapper>
    </Router>,
    document.getElementById('root')
)