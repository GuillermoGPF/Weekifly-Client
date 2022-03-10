import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'


function PrivateRoute() {
    const { isLoggedIn, isLoading, user } = useContext(AuthContext)

    if (isLoading || !user) {
        return <LoadingSpinner />
    }

    if (!isLoggedIn) {
        return <Navigate to='/' />
    }

    if (user) {
        return <Outlet />
    }
}

export default PrivateRoute