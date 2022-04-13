import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../../context/theme.context'
import { useContext } from 'react'


const SearchFriends = ({ filterFriends }) => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    function handleInput(e) {
        filterFriends(e.target.value)
    }

    return (
        <Form className={'formSearch ' + theme}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input className={theme} 
                   type={'search'} 
                   placeholder={'Busca y encuentra tus amigos para hacer planes'} 
                   onChange={handleInput} />
        </Form>
    )
}

export default SearchFriends