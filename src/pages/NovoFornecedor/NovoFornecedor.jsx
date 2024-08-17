import { CgAdidas } from 'react-icons/cg'
import Layout from '../../components/Layout/Layout'
import './main.sass'
import { useEffect, useState } from 'react'
import InputPadrao from '../../components/input/InputPadrao/InputPadrao'
import ModalAdicionarTelefone from '../../components/modal/AdicionarTelefone/ModalAdicionarTelefone'
import { IoMdPersonAdd } from "react-icons/io";
import { adicionarFornecedor } from '../../services/fornecedor/fornecedor'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/Loading/LoadingSpinner'

function NovoFornecedor() {


    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [atualizar, setAtualziar] = useState(true)
    const [mostrarCarregando, setMostrarCarregando] = useState(false)

    const [listaContato, setListaContato] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);



    const data = {
      nome: nome,
      cnpj: cnpj,
      contatos: listaContato
    }

    const addFornecedor = (data) => {
      adicionarFornecedor(data).then((resp) => {
        toast.success(resp.data.descricao)
        setAtualziar(!atualizar)
        setMostrarCarregando(false)
        setNome('')
        setCnpj('')
        setListaContato([])
      }).catch((resp) => {
        toast.error("Fornecedor não foi salvo.")
      })
    }

    const handlerAdicionar = (e) => {
      e.preventDefault()
      setMostrarCarregando(true)
      addFornecedor(data)
    }

    const handlerNovoContato = (e) => {
      e.preventDefault()
      setIsModalOpen(true)
    }

    useEffect(() => {
    }, [isModalOpen])

  return (
    <Layout>
        <div className="container">
            <h1><CgAdidas /> Add Fornecedor</h1>
            <div className="sessoes">
                <InputPadrao type={'text'} label={"Nome do fornecedor"} dado={nome} setDado={setNome}/>
                <InputPadrao type={'text'} label={"CNPJ"} dado={cnpj} setDado={setCnpj}/>
            </div>

            <div className="sessoes contato">
              <h1 id='contas'><CgAdidas /> Contatos da empresa</h1>
              <button className='botao' onClick={(e) => handlerNovoContato(e)}><IoMdPersonAdd /> Add Contato</button>
            </div>

            <div className="sessoes quadro">
              {listaContato != 0 ? 
                  <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Opcoes</th>
                        </tr>
                    </thead>
                        {listaContato.map(item => (
                            <tr>
                                <td id="idUsuario">{item.nomeContato}</td>
                                <td id="nomeUsuario">{item.emails  && item.emails.length > 0  ? item.emails[0].email : []}</td>
                                <td>{item.telefones && item.telefones.length > 0 ? item.telefones[0].telefone : []}</td>
                            </tr>
                        ))}
                    <tbody>
                    </tbody>
                  </table>
                   : <div className='sem-contato'>Não contem informações de contato.</div>} 
            </div>
            <div className='sessoes button'>
                <button className='botao' onClick={(e) => handlerAdicionar(e)}>Adicionar</button>
            </div>

            {isModalOpen && <ModalAdicionarTelefone lista={listaContato} setLista={setListaContato} mostrarModal={setIsModalOpen}/>}
            {mostrarCarregando && <LoadingSpinner mensagem={"Gerando nova filial."}/>}

        </div>
    </Layout>
  )
}

export default NovoFornecedor