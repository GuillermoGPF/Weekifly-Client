import { Container, Row, Card } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import PlansList from '../components/PlansList/PlansList'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import planService from '../services/plans.service'
import { AuthContext } from './../context/auth.context'
import { ThemeContext } from '../context/theme.context'


const Profile = () => {
    const { user } = useContext(AuthContext)
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [plans, setPlans] = useState([])

    useEffect(() => loadPlans(), [])

    const loadPlans = () => {
        planService
                   .getAllPlans()
                   .then(({ data }) => {
                        setPlans(data)
                   })
                   .catch(err => console.log(err))
    }

    return (
        <div className={theme}>
            <Navbar />
            <Container className='hero'>
                <Card className={theme}>
                    <Card.Body>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h3>Mi perfil</h3>
                            <Link to='/ajustes' className='edit'>
                                    <FontAwesomeIcon icon={faEdit} />
                            </Link>
                        </div>
                        <div className='profile'>
                            <img src={user.avatar} alt={user.username} />
                            <div className='d-flex flex-column justify-content-center align-items-start'>
                                <h2>{user.username}</h2>
                                <h3>Sobre mí</h3>
                                <p>{user.description}</p>
                                <h3>Cumpleaños</h3>
                                <p>{user.birthday}</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className={theme}>
                    <Card.Body>
                        <h3>Mis planes</h3>
                        {
                            !plans.length ? <LoadingSpinner /> : 
                            <PlansList plans={plans} />
                        }
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </div>
    )
}

export default Profile