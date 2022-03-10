import { Navbar as NavigationBar, Nav, Button, Modal } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Brand from '../Brand/Brand'
import PlanForm from '../PlanForm/PlanForm'
import planService from '../../services/plans.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faHouse, faIcons, faPlus, faUsers, faUserAstronaut, faCog } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../context/auth.context'
import './Navbar.css'


const Navbar = () => {
    const [isActive, setActive] = useState(false)
    const [plans, setPlans] = useState([])
    const { user } = useContext(AuthContext)

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
        <>
            <NavigationBar>
                <Nav className='nav'>
                    <NavLink to='/inicio'>
                        <Brand />
                    </NavLink>
                    <div className='buttons'>
                        <NavLink to='/perfil' className='contact'>
                            <img src={user.avatar} alt={user.username} />
                            <span className='user-name'>{user.username}</span>
                        </NavLink>
                        <Button className='button' onClick={toggleClass}>
                            <FontAwesomeIcon icon={faTh} />
                            <p>Menú</p>
                        </Button>
                    </div>
                </Nav>
            </NavigationBar>

            <div className={`menu ${isActive ? 'open' : ''}`}>
                <NavLink to='/inicio' className={({ isActive }) => isActive ? 'selected' : ''}>
                    <FontAwesomeIcon icon={faHouse} /><p>Home</p>
                </NavLink>
                <NavLink to='/planes' className={({ isActive }) => isActive ? 'selected' : ''}>
                    <FontAwesomeIcon icon={faIcons} /><p>Planes</p>
                </NavLink>
                <Button className='button' onClick={handleShow}>
                    <FontAwesomeIcon icon={faPlus} /><p>Planear</p>
                </Button>
                <NavLink to='/amigos' className={({ isActive }) => isActive ? 'selected' : ''}>
                    <FontAwesomeIcon icon={faUsers} /><p>Amigos</p>
                </NavLink>
                <NavLink to='/perfil' className={({ isActive }) => isActive ? 'selected' : ''}>
                    <FontAwesomeIcon icon={faUserAstronaut} /><p>Perfil</p>
                </NavLink>
                <NavLink to='/ajustes' className={({ isActive }) => isActive ? 'selected' : ''}>
                    <FontAwesomeIcon icon={faCog} /><p>Ajustes</p>
                </NavLink>
            </div>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <PlanForm closeModal={handleClose} refreshPlans={loadPlans} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Navbar