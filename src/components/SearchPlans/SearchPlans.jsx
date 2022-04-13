import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../../context/theme.context'
import { useContext } from 'react'


const SearchPlans = ({ filterPlans }) => {
    const { theme, toggleTheme } = useContext(ThemeContext)

    function handleInput(e) {
        filterPlans(e.target.value)
    }

    return (
        <Form className={'formSearch ' + theme}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input className={theme} 
                   type={'search'} 
                   placeholder={'Busca y encuentra tu plan'} 
                   onChange={handleInput} />
        </Form>
    )
}

export default SearchPlans