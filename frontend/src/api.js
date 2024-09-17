// Add interceptor to add headers
import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

// create an axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
})

api.interceptors.request.use(
    (config) =>{
        // Get the token
        const token = localStorage.getItem(ACCESS_TOKEN); 
        // Add the token to the header
        if (token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
export default api