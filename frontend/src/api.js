// Add interceptor to add headers
import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const apiURL ="https://1827ee4c-0510-41b3-90ca-df76be52b36f-dev.e1-us-cdp-2.choreoapis.dev/djangoreact/backend/v1"

// create an axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiURL
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