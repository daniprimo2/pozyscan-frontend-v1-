import { baseAutenticar } from "../api/base"


export const adicionarFornecedor = (data) => {
    const url = '/fornecedor/adicionar'
    return baseAutenticar.post(url, data)
}

export const buscarFornecedor = (data, page) => {
    const url = `/fornecedor/buscar/filtro?size=10&page=${page}`
    return baseAutenticar.post(url, data);
}

export const deletarFornecedor = (id) => {
    const url = `/fornecedor/deletar/${id}`
    return baseAutenticar.delete(url)
}
