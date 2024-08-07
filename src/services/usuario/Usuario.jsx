import { baseAutenticar } from "../api/base";

export const adicionarUsuario = (data) => {
    const url = "/usuario"
    return baseAutenticar.post(url, data);
}


export const getUsuario = (data, page) => {
    const url = `/usuario/busca/filtro?size=10&page=${page}`
    return baseAutenticar.post(url, data);
}


export const deleteUsuario = (id) => {
    const url = `/usuario/deletar/${id}`
    return baseAutenticar.delete(url);
}