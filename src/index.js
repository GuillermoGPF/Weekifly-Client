import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from '../src/context/auth.context'
import App from './App'
import { MessageProviderWrapper } from '../src/context/userMessage.context'
import { PlanMessageProvider } from '../src/context/planMessage.context'

ReactDOM.render(
    <Router>
        <AuthProviderWrapper>
            <PlanMessageProvider>
                <MessageProviderWrapper>
                    <App />
                </MessageProviderWrapper>
            </PlanMessageProvider>
        </AuthProviderWrapper>
    </Router>,
    document.getElementById('root')
)