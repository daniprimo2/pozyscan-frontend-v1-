import { baseAutenticar } from "../api/base";



export const adicionarFilial = (data) => {
    const url = "/filial/adicionar"
    return baseAutenticar.post(url, data);
}

export const getFilial = (data, page) => {
    const url = `/filial/buscar/filtro?size=10&page=${page}`
    return baseAutenticar.post(url, data);
}

export const deleteFilial = (id) => {
    const url = `/filial/deletar/${id}`
    return baseAutenticar.delete(url);
}