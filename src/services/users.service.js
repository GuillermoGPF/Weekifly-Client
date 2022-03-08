import axios from 'axios'

class UserService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/user` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");
        
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
        
            return config
        })
    }

    getAllUsers = () => {
        return this.api.get('/getAllUsers')
    }

    getOneUser = id => {
        return this.api.get(`/getOneUser/${id}`)
    }

    createUser = user => {
        return this.api.post(`/createUser`, user)
    }

    putUser = id => {
        return this.api.put(`/editUser/${id}/edit`)
    }

    deleteUser = id => {
        return this.api.delete(`/deleteUser/${id}/delete`)
    }
}

const userService = new UserService()

export default userService