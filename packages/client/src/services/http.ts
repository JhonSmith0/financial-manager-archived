import axios, { Axios } from "axios"

class HTTP extends Axios {}

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000/",
})

export default api
