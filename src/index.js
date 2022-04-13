import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { HashRouter as Router } from 'react-router-dom'
import { ThemeProviderWrapper } from './context/theme.context'
import { AuthProviderWrapper } from './context/auth.context'
import { MessageProviderWrapper } from './context/userMessage.context'

ReactDOM.render(
    <Router>
        <ThemeProviderWrapper>
            <AuthProviderWrapper>
                <MessageProviderWrapper>
                    <App />
                </MessageProviderWrapper>
            </AuthProviderWrapper>
        </ThemeProviderWrapper>
    </Router>,
    document.getElementById('root')
)