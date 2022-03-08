import { Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const SearchPlans = ({ filterPlans }) => {
    function handleInput(e) {
        filterPlans(e.target.value)
    }

    return (
        <Form className='formSearch'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type={'search'} placeholder={'Busca y encuentra tu plan'} onChange={handleInput}></input>
        </Form>
    )
}

export default SearchPlans