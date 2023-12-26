import axios, { Axios } from "axios";

export const axiosInstance = axios.create({
    timeout: 1000,
    baseURL: 'http://localhost:8080',
})

