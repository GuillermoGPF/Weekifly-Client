import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const SearchFriends = ({ filterFriends }) => {
    function handleInput(e) {
        filterFriends(e.target.value)
    }

    return (
        <Form className='formSearch'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type={'search'} placeholder={'Busca y encuentra tus amigos para hacer planes'} onChange={handleInput}></input>
        </Form>
    )
}

export default SearchFriends