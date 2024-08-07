import axios from "axios";

export const baseAutenticar = axios.create({
    baseURL: "https://pozyscan-backend-v1.onrender.com",
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }
})


export const verificarServidor = () => {
        return baseAutenticar.get('/');
};