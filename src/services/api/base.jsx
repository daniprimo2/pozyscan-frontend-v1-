import axios from "axios";

export const baseAutenticar = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }
})


export const verificarServidor = () => {
        return baseAutenticar.get('/');
};