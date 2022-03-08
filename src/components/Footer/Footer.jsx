import { Navbar as NavigationBar, Nav, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faIcons, faPlus, faUsers, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'


const Footer = () => {
    return (
        <>
            <NavigationBar>
                <Nav className='footer'>
                    <Link to='/inicio'><FontAwesomeIcon icon={faHouse} /><p>Home</p></Link>
                    <Link to='/planes'><FontAwesomeIcon icon={faIcons} /><p>Planes</p></Link>
                    <Link to='#' data-bs-toggle='modal' data-bs-target='#modal'>
                        <FontAwesomeIcon icon={faPlus} /><p>Planear</p>
                    </Link>
                    <Link to='/amigos'><FontAwesomeIcon icon={faUsers} /><p>Amigos</p></Link>
                    <Link to='/perfil'><FontAwesomeIcon icon={faUserAstronaut} /><p>Perfil</p></Link>
                </Nav>
            </NavigationBar>
        </>
    )
}

export default Footer