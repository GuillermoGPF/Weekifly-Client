import axios from 'axios'

class PlanService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/plans` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem('authToken')
        
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
        
            return config
        })
    }

    getAllPlans = () => {
        return this.api.get('/getAllPlans')
    }

    getOnePlan = id => {
        return this.api.get(`/getOnePlan/${id}`)
    }

    createPlan = plan => {
        return this.api.post(`/createPlan`, plan)
    }

    putPlan = (id, plan) => {
        return this.api.put(`/editOnePlan/${id}/edit`, plan)
    }

    deletePlan = id => {
        return this.api.delete(`/deleteOnePlan/${id}/delete`)
    }
}

const planService = new PlanService()

export default planService