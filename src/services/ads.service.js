import axios from 'axios'

class AdService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/ads` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem('authToken')
        
            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
        
            return config
        })
    }

    getAllAds = () => {
        return this.api.get('/getAllAds')
    }

    getOneAd = id => {
        return this.api.get(`/getOneAd/${id}`)
    }

    createAd = ad => {
        return this.api.post(`/createAd`, ad)
    }

    putAd = (id, ad) => {
        return this.api.put(`/editOneAd/${id}/edit`, ad)
    }

    deleteAd = id => {
        return this.api.delete(`/deleteOneAd/${id}/delete`)
    }
}

const adService = new AdService()

export default adService