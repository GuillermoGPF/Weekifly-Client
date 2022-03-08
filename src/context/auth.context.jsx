import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/auth.service'

const AuthContext = createContext()

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    const storeToken = (token) => {
        localStorage.setItem('authToken', token)
    }

    const removeToken = () => {
        localStorage.removeItem('authToken')
    }

    const getToken = () => {
        return localStorage.getItem('authToken')
    }

    const authenticateUser = () => {
        const storedToken = getToken()

        if (!storedToken) {
            logOutUser()
            // navigate('/')
        } else {
            authService
                       .verify(storedToken)
                       .then(({ data }) => {
                            const user = data
                            setIsLoggedIn(true)
                            setIsLoading(false)
                            setUser(user)
                       })
                       .catch(() => logOutUser())
        }
    }

    // const navigate = useNavigate()

    const logOutUser = () => {
        removeToken()
        setIsLoggedIn(false)
        setIsLoading(false)
        setUser(null)
        // navigate('/')
    }

    useEffect(() => authenticateUser(), [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }