import { Navbar as NavigationBar, Nav, Button, Modal } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import PlanForm from '../PlanForm/PlanForm'
import planService from '../../services/plans.service'
import { ThemeContext } from '../../context/theme.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faIcons, faPlus, faUsers, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import './Footer.css'


const Footer = () => {
    const [plans, setPlans] = useState([])
    const [show, setShow] = useState(false)
    const { theme } = useContext(ThemeContext)

    useEffect(() => loadPlans(), [])

    const loadPlans = () => {
        planService
                   .getAllPlans()
                   .then(({ data }) => setPlans(data))
                   .catch(err => console.log(err))
    }
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <NavigationBar>
                <Nav className={'footer ' + theme}>
                    <NavLink to='/inicio' className={({ isActive }) => isActive ? 'selected' : ''}>
                        <FontAwesomeIcon icon={faHouse} /><p>Inicio</p>
                    </NavLink>
                    <NavLink to='/planes' className={({ isActive }) => isActive ? 'selected' : ''}>
                        <FontAwesomeIcon icon={faIcons} /><p>Planes</p>
                    </NavLink>
                    <NavLink className={'addPlan ' + theme} to='' onClick={handleShow}>
                        <FontAwesomeIcon icon={faPlus} /><p>Planear</p>
                    </NavLink>
                    <NavLink to='/amigos' className={({ isActive }) => isActive ? 'selected' : ''}>
                        <FontAwesomeIcon icon={faUsers} /><p>Amigos</p>
                    </NavLink>
                    <NavLink to='/perfil' className={({ isActive }) => isActive ? 'selected' : ''}>
                        <FontAwesomeIcon icon={faUserAstronaut} /><p>Perfil</p>
                    </NavLink>
                </Nav>
            </NavigationBar>
    
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <PlanForm closeModal={handleClose} refreshPlans={loadPlans} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Footer