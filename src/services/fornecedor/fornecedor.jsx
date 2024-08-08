import { baseAutenticar } from "../api/base"


export const adicionarFornecedor = (data) => {
    const url = '/fornecedor/adicionar'
    return baseAutenticar.post(url, data)
}