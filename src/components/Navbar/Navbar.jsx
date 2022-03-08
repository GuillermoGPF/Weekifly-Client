import { Navbar as NavigationBar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import Brand from '../Brand/Brand'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faHouse, faIcons, faPlus, faUsers, faUserAstronaut, faCog } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../context/auth.context'
import './Navbar.css'


const Navbar = () => {
    const [isActive, setActive] = useState(false);
    const { user } = useContext(AuthContext)

    const toggleClass = () => {
      setActive(!isActive);
    }

    return (
        <>
            <NavigationBar>
                <Nav className='nav'>
                    <Link to='/inicio'>
                        <Brand />
                    </Link>
                    <div className='buttons'>
                        <Link to='/perfil' className='contact'>
                            <img src={user.avatar} alt={user.username} />
                            <span className='user-name'>{user.username}</span>
                        </Link>
                        <Button className='button' onClick={toggleClass}>
                            <FontAwesomeIcon icon={faTh} />
                            <p>Menú</p>
                        </Button>
                    </div>
                </Nav>
            </NavigationBar>

            <div className={`menu ${isActive ? 'open' : ''}`}>
                <Link to='/inicio'><FontAwesomeIcon icon={faHouse} /><p>Home</p></Link>
                <Link to='/planes'><FontAwesomeIcon icon={faIcons} /><p>Planes</p></Link>
                <Link to='#' data-bs-toggle='modal' data-bs-target='#modal'>
                    <FontAwesomeIcon icon={faPlus} /><p>Planear</p>
                </Link>
                <Link to='/amigos'><FontAwesomeIcon icon={faUsers} /><p>Amigos</p></Link>
                <Link to='/perfil'><FontAwesomeIcon icon={faUserAstronaut} /><p>Perfil</p></Link>
                <Link to='/ajustes'><FontAwesomeIcon icon={faCog} /><p>Ajustes</p></Link>
            </div>
        </>
    )
}

export default Navbar