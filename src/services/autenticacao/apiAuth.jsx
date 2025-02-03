import axios from "axios";


export const baseAutenticar = axios.create({
    baseURL: "http://localhost:8080",
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