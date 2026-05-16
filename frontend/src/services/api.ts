import axios, { type InternalAxiosRequestConfig } from "axios";
const API = axios.create({
    baseURL:  "https://civic-ai-chz7.onrender.com"
})

API.interceptors.request.use((req: InternalAxiosRequestConfig ): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token")

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }

    return req
})

export default API