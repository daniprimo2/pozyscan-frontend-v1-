import Layout from '../../components/Layout/Layout'
import { CgAdidas, CgAlignLeft } from "react-icons/cg";


import './main.sass'
import { useState } from 'react';
import InputPadrao from '../../components/input/InputPadrao/InputPadrao';
import InputSelect from '../../components/input/ImputSelect/InputSelect';
import { adicionarFilial } from '../../services/filial/filial';
import { toast } from 'react-toastify';
import BuscarFiliais from '../../components/Tabela/BuscarFiliais/BuscarFiliais';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';


function NovaFilial() {
    const [nome, setNome] = useState('')
    const [centroDeCusto, setCentroDeCusto] = useState('')
    const [patente, setPatente] = useState('')
    const [atualizar, setAtualziar] = useState(true)
    const [mostrarCarregando, setMostrarCarregando] = useState(false)

    const data = {
        nome: nome,
        centroDeCusto: centroDeCusto,
        patente: patente
    }

    const addFilial = (data) => {
        adicionarFilial(data).then((resp) => {
            toast.success(resp.data.nome + " salvo com sucesso.")
            setAtualziar(!atualizar)
            setMostrarCarregando(false)
        }).catch((e) => {
            toast.error("Erro ao salvar filial.")
            setMostrarCarregando(false)
        })
    }

    const listaCentroDeCusto = [
        {value: "Mecanica", nome: "CC01"},
        {value: "Borracharia", nome: "CC02"},
        {value: "Eletrica", nome: "CC03"}
    ]

    const listaPatente = [
        {value: "Matriz", nome: "Matriz"},
        {value: "Filial", nome: "Filial"}
    ]

    const handlerSubmit = (e) => {
        e.preventDefault()
        setMostrarCarregando(true)
        addFilial(data)
        setNome('')
    }

  return (
    <Layout>
        <div className="container">
            <h1><CgAdidas /> Add Filial</h1>
            <div className="sessoes">
                <InputPadrao type={'text'} label={"Nome da filial"} dado={nome} setDado={setNome}/>
                <InputSelect label={"Selecione centro de custo: "}
                             placeholder={"Centro de Custo"}
                             listaOpcoes={listaCentroDeCusto}
                             dado={centroDeCusto}
                             setDado={setCentroDeCusto}/>
                <InputSelect label={"Selecione a patente: "}
                             placeholder={"Patente"}
                             listaOpcoes={listaPatente}
                             dado={patente}
                             setDado={setPatente}/>                
            </div>
            <div className='sessoes button'>
                <button className='botao' onClick={(e) => handlerSubmit(e)}>Adicionar</button>
            </div>
            <h1><CgAlignLeft/> Filiais</h1>
            <BuscarFiliais atualziarPeloAdicionar={atualizar}/>
        </div>
        {mostrarCarregando && <LoadingSpinner mensagem={"Gerando nova filial."}/>}

    </Layout>
  )
}

export default NovaFilial