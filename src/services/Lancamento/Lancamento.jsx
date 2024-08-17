import { baseAutenticar } from "../autenticacao/apiAuth"

export const buscarOpcoesSelects = () => {
    const url = "/lancamento/listaDosSelects"
    return baseAutenticar.get(url);
}

export const adicionarNotaFiscal = (data) => {
    const url = '/notaFiscal/gerarNota'
    return baseAutenticar.post(url, data)
}

export const buscarAsNotas = (numero) => {
    const url = `/notaFiscal/buscarNota/${numero}`
    return baseAutenticar.get(url);
}

export const salvarLancamento = (data) => {
    const url = `/lancamento/novo`
    return baseAutenticar.post(url, data);
}

export const buscarLancamentosComFiltros = (data) => {
    const url = `/lancamento/buscaLancamentos/comFiltro`
    return baseAutenticar.post(url, data);
}

export const buscarAsPecelas = (data) => {
    const url = `/lancamento/buscaParcelas/comFiltro`
    return baseAutenticar.post(url, data)
}

export const deletarLancamentos = (idLancamento) => {
    const url = `/lancamento/deletarLancamentos/${idLancamento}`
    return baseAutenticar.delete(url);
}