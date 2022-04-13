import { Col, Container, Row } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import PlansList from '../components/PlansList/PlansList'
import SearchPlans from './../components/SearchPlans/SearchPlans'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import planService from '../services/plans.service'
import { ThemeContext } from '../context/theme.context'


const Plans = () => {
    const [plans, setPlans] = useState([])
    const [plansCopy, setCopy] = useState([])
    const { theme, toggleTheme } = useContext(ThemeContext)

    useEffect(() => loadPlans(), [])

    const loadPlans = () => {
        planService
                   .getAllPlans()
                   .then(({ data }) => {
                        setPlans(data)
                        setCopy(data)
                   })
                   .catch(err => console.log(err))
    }

    function filterPlans(str) {
        let filteredPlans
        str ? filteredPlans = plansCopy.filter(elm => elm.name.includes(str))
            : filteredPlans = plansCopy
        setPlans(filteredPlans)
    }

    return (
        <div className={theme}>
            <Navbar />
            <Container className='hero'>
                <Row>
                    <Col>
                        <h2>Planes</h2>
                    </Col>
                </Row>
                <SearchPlans filterPlans={filterPlans} />
                {!plans.length ? <LoadingSpinner /> : <PlansList plans={plans} />}
            </Container>
            <Footer />
        </div>
    )
}

export default Plans