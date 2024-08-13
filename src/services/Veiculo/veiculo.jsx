import { baseAutenticar } from "../api/base";



export const adicionarVeiculo = (data) => {
    const url = `/veiculo/adicionar`
    return baseAutenticar.post(url, data);
}


export const adicionarTipo = (data) => {
    const url = `/tipo/adicionar`
    return baseAutenticar.post(url, data);
}

export const buscarTodosTipos = () => {
    const url = `/tipo/buscarTodos`
    return baseAutenticar.get(url);
}

export const adicionarCategoria = (data) => {
    const url = `/categoria/adicionar`
    return baseAutenticar.post(url, data);
}


export const buscarTodosCategoria = () => {
    const url = `/categoria/buscarTodos`
    return baseAutenticar.get(url);
}

export const getVeiculos = (data, page) => {
    const url = `/veiculo/busca/filtro?size=10&page=${page}`
    return baseAutenticar.post(url, data);
}

export const deletarPorId = (placa) => {
    const url = `/veiculo/deletar/${placa}`
    return baseAutenticar.delete(url)
}