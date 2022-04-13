import { Navbar as NavigationBar, Nav, Button, Modal } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Brand from '../Brand/Brand'
import PlanForm from '../PlanForm/PlanForm'
import planService from '../../services/plans.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faHouse, faIcons, faPlus, 
        faUsers, faUserAstronaut, faPowerOff, faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../context/auth.context'
import { ThemeContext } from '../../context/theme.context'
import './Navbar.css'


const Navbar = () => {
    const [isActive, setActive] = useState(false)
    const [plans, setPlans] = useState([])
    const { logOutUser, user } = useContext(AuthContext)
    const { theme, toggleTheme } = useContext(ThemeContext)

    const [show, setShow] = useState(false)

    useEffect(() => loadPlans(), [])

    const loadPlans = () => {
        planService
                   .getAllPlans()
                   .then(({ data }) => setPlans(data))
                   .catch(err => console.log(err))
    }
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const toggleClass = () => {
        setActive(!isActive)
    }

    return (
        <div className={'navigation ' + theme}>
            <NavigationBar>
                <Nav className={'nav ' + theme}>
                    <NavLink to='/inicio'>
                        <Brand />
                    </NavLink>
                    <NavLink id='camera' to='/' className={({ isActive }) => isActive ? 'selected' : ''}>
                        <FontAwesomeIcon icon={faCameraRetro} />
                        <p>Cámara</p>
                    </NavLink>
                    <div className='buttons'>
                        <NavLink to='/perfil' className={'contact ' + theme}>
                            <img src={user.avatar} alt={user.username} />
                            <span className='user-name'>{user.username}</span>
                        </NavLink>
                        <Button className='button' onClick={toggleClass}>
                            <FontAwesomeIcon icon={faTh} />
                            <p>Menú</p>
                        </Button>
                        <Button id='logout' className='button' onClick={logOutUser}>
                            <FontAwesomeIcon icon={faPowerOff} />
                            <p>Salir</p>
                        </Button>
                        <Button id='theme' className='button' onClick={toggleTheme}>
                            {theme === 'light' ? '🌜' : '🟡'}
                            <p>Modo</p>
                        </Button>
                    </div>
                </Nav>
            </NavigationBar>

            <div className={`menu ${isActive ? 'open' : ''} ` + theme}>
                <NavLink to='/inicio' className={({ isActive }) => isActive ? 'selected' : ''}>
                    <FontAwesomeIcon icon={faHouse} /><p>Inicio</p>
                </NavLink>
                <NavLink to='/planes' className={({ isActive }) => isActive ? 'selected' : ''}>
                    <FontAwesomeIcon icon={faIcons} /><p>Planes</p>
                </NavLink>
                <NavLink to='' onClick={handleShow}>
                    <FontAwesomeIcon icon={faPlus} /><p>Planear</p>
                </NavLink>
                <NavLink to='/amigos' className={({ isActive }) => isActive ? 'selected' : ''}>
                    <FontAwesomeIcon icon={faUsers} /><p>Amigos</p>
                </NavLink>
                <NavLink to='/perfil' className={({ isActive }) => isActive ? 'selected' : ''}>
                    <FontAwesomeIcon icon={faUserAstronaut} /><p>Perfil</p>
                </NavLink>
                <NavLink to='/' className={({ isActive }) => isActive ? 'selected' : ''}>
                    <FontAwesomeIcon icon={faCameraRetro} /><p>Cámara</p>
                </NavLink>
            </div>
    
            <Modal contentClassName={theme} show={show} onHide={handleClose} centered>
                <Modal.Header closeButton={theme}></Modal.Header>
                <Modal.Body>
                    <PlanForm closeModal={handleClose} refreshPlans={loadPlans} />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Navbar