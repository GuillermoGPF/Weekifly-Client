import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'
import Plans from '../pages/Plans'
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'
import SignupPage from '../pages/SignupPage'
import Users from '../pages/Users'
import PlanDetails from '../pages/PlanDetails'
import UserDetails from '../pages/UserDetails'
import NotFound from '../pages/NotFound'
import EditPlan from '../pages/EditPlan'
import PrivateRoute from '../routes/PrivateRoute'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/registro' element={<SignupPage />} />
            
            <Route path='/inicio' element={<PrivateRoute />}>
                <Route path='' element={<Home />} />
            </Route>
            <Route path='/planes' element={<PrivateRoute />}>
                <Route path='' element={<Plans />} />
            </Route>
            <Route path='/detalles-plan/:plan_id' element={<PrivateRoute />}>
                <Route path='' element={<PlanDetails />} />
            </Route>
            <Route path='/editar-plan/:plan_id' element={<PrivateRoute />}>
                <Route path='' element={<EditPlan />} />
            </Route>
            <Route path='/perfil' element={<PrivateRoute />}>
                <Route path='' element={<Profile />} />
            </Route>
            <Route path='/ajustes' element={<PrivateRoute />}>
                <Route path='' element={<Settings />} />
            </Route>
            <Route path='/amigos' element={<PrivateRoute />}>
                <Route path='' element={<Users />} />
            </Route>
            <Route path='/detalles-amigo/:user_id' element={<PrivateRoute />}>
                <Route path='' element={<UserDetails />} />
            </Route>
            <Route path='/404' element={<PrivateRoute />}>
                <Route path='' element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes