import { baseAutenticar } from "../api/base";

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