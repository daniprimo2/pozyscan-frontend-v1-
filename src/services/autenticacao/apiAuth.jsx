import axios from "axios";


export const baseAutenticar = axios.create({
    baseURL: "https://pozyscan-backend-v1.onrender.com/",
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }
})

export const autenticar = (data) => {
    const url = "/autenticacao/login"
    return baseAutenticar.post(url, data);
}

/* - filial0004 - */