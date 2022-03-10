import { Navbar as NavigationBar, Nav, Button, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import PlanForm from '../PlanForm/PlanForm'
import planService from '../../services/plans.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faIcons, faPlus, faUsers, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import './Footer.css'


const Footer = () => {
    const [plans, setPlans] = useState([])

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

    return (
        <>
            <NavigationBar>
                <Nav className='footer'>
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
                </Nav>
            </NavigationBar>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <PlanForm closeModal={handleClose} refreshPlans={loadPlans} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Footer