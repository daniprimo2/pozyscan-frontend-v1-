import { CgAdidas } from 'react-icons/cg'
import Layout from '../../components/Layout/Layout'
import './main.sass'
import { useState } from 'react'

function NovoFornecedor() {
    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')

  return (
    <Layout>
        <div className="container">
            <h1><CgAdidas /> Add Fornecedor</h1>
            <div className="sessoes">
                <InputPadrao type={'text'} label={"Nome do fornecedor"} dado={nome} setDado={setNome}/>
                <InputPadrao type={'text'} label={"CNPJ"} dado={cnpj} setDado={setCnpj}/>
            </div>
        </div>
    </Layout>
  )
}

export default NovoFornecedor