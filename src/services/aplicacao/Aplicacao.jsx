import { baseAutenticar } from "../api/base"


export const adicionarAplicacao = (data) => {
    const url = "/aplicacao/adicionar"
    return baseAutenticar.post(url, data);
}


export const getAplicacoes = (data, page) => {
    const url = `/aplicacao/buscar/Filtro?size=10&page=${page}`
    return baseAutenticar.post(url, data);
}


export const deleteAplicacao = (id) => {
    const url = `/aplicacao/deletar/${id}`
    return baseAutenticar.delete(url)
}