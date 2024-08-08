import Layout from "../../components/Layout/Layout"
import { RiUserAddFill } from "react-icons/ri";
import InputPadrao from "../../components/input/InputPadrao/InputPadrao";
import { useState } from "react";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import BuscarAplicacoes from "../../components/Tabela/BuscarAplicacoes/BuscarAplicacoes";
import { adicionarAplicacao } from "../../services/aplicacao/Aplicacao";
import { toast } from "react-toastify";

function NovaAplicacao() {
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [mostrarCarregando, setMostrarCarregando] = useState(false)
    const [atualizar, setAtualziar] = useState(true)

    const data = {
        tipo: nome,
        descricao: descricao
    }

    const addAplicacao = (data) => {
        adicionarAplicacao(data).then((resp) => {
            toast.success("Aplicacao "+ resp.data.tipo + "Salvo com sucesso")
            setAtualziar(!atualizar)
            setMostrarCarregando(false)
        }).catch((e) => {
            toast.error("Erro foi salvo " + e.message)
            setMostrarCarregando(false)
        })
    }


    const handlerSubmit = (e) => {
        e.preventDefault()
        setMostrarCarregando(true)
        addAplicacao(data)
        setNome('')
        setDescricao('')
        
    }

  return (
    <Layout>
        <div className="container">
            <h1><RiUserAddFill /> Add Nova Aplicação</h1>
            <div className="sessoes">
                <InputPadrao type={'text'} label={'Nome'} dado={nome} setDado={setNome}/>
                <InputPadrao type={'text'} label={'Descricao'} dado={descricao} setDado={setDescricao}/>
            </div>
            <div className="sessoes button">
                <button className="botao" onClick={(e) => handlerSubmit(e)}>Adicionar</button>
            </div>
            <h1><RiUserAddFill /> Aplicações</h1>
            <BuscarAplicacoes atualziarPeloAdicionar={atualizar}/>
        </div>
        {mostrarCarregando && <LoadingSpinner mensagem={"Gerando novo usuário."}/>}

    </Layout>
  )
}

export default NovaAplicacao