import Layout from "../../components/Layout/Layout"
import { RiUserAddFill } from "react-icons/ri";
import InputPadrao from "../../components/input/InputPadrao/InputPadrao";
import { useState } from "react";

import './main.sass'
import InputSelect from "../../components/input/ImputSelect/InputSelect";
import BuscaUsuarios from "../../components/Tabela/BuscaUsuarios/BuscaUsuarios";
import { adicionarUsuario } from "../../services/usuario/Usuario";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

function NovoUsuario() {
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [cargo, setCargo] = useState()
    const [atualizar, setAtualziar] = useState(true)
    const [mostrarCarregando, setMostrarCarregando] = useState(false)

    const data = {
        nome: nome,
        email: email,
        cargo: cargo
    }


    const addUsuario = (data) => {
        adicionarUsuario(data).then((resp) => {
            toast.success(resp.data.descricaoErro)
            setAtualziar(!atualizar)
            setMostrarCarregando(false)
        }).catch((e) => {
            toast.error(e.message)
            console.log(e)
        })
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        setMostrarCarregando(true)
        addUsuario(data)
        setCargo('Selecione uma Categoria')
        setEmail('')
        setNome('')
    }

    const listaCategoria = [
        {value: "Administrador", nome: "Administrador"},
        {value: "Operador", nome: "Operador"}
    ]


  return (
    <Layout>
        <div className="container">
             <h1><RiUserAddFill/> Add usuario</h1>
            <div className="sessoes">
                <InputPadrao type={'text'} label={"Nome"} dado={nome} setDado={setNome}/>
                <InputPadrao type={'text'} label={"Email"} dado={email} setDado={setEmail}/>
                <InputSelect label={"Selecione Cargo: "}
                             placeholder={"Cargo"}
                             listaOpcoes={listaCategoria}
                             dado={cargo}
                             setDado={setCargo}/>
            </div>
            <div className='sessoes button'>
                <button className='botao' onClick={(e) => handlerSubmit(e)}>Adicionar</button>
            </div>
            <h1><RiUserAddFill/> Usuarios</h1>

            <BuscaUsuarios atualziarPeloAdicionar={atualizar}/>
        </div>
        {mostrarCarregando && <LoadingSpinner mensagem={"Gerando novo usuário."}/>}
    </Layout>
  )
}

export default NovoUsuario