import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { HashRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from '../src/context/auth.context'
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