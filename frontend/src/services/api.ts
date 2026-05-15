import axios, { type InternalAxiosRequestConfig } from "axios";
const API = axios.create({
    baseURL:  "http://127.0.0.1:8000"
})

API.interceptors.request.use((req: InternalAxiosRequestConfig ): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token")

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }

    return req
})

export default API