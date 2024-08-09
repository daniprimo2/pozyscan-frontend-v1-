import { useState } from 'react'
import './main.sass'

function ModalAdicionarTelefone({mostrarModal, setLista, lista}) {
    const [contatoNome, setContatoNome] = useState()

    const [contatoEmail, setContatoEmail] = useState()
    const [tipoEmail, setTipoEmail] = useState()

    
    const [contatoTelefone, setContatoTelefone] = useState()
    const [tipoTelefone, setTipoTelefone] = useState()

    const contato = {
        nomeContato: contatoNome,
        emails: [],
        telefones: []

    }

    const handlerSubmit = (e) => {
        e.preventDefault()


        if (contatoEmail != null) {
            console.log("Inserindo email")
            contato.emails = [{email: contatoEmail, tipo: tipoEmail}];
        }


        if (contatoTelefone != null) {
            console.log("Inserindo telefone")
            contato.telefones = [{telefone: contatoTelefone, tipo: tipoTelefone}];
        }

        console.log(contato)

        setLista([...lista, contato])    

        mostrarModal(false)

    }


    const handlerExit = (e) => {
        e.preventDefault()
        mostrarModal(false)
    }

  return (
    <div className='modal-overlay'>
    <div className='modal'>
      <h2>Adicionar Novo contato</h2>
      <label>
        Nome:
        <input type="text"
               value={contatoNome}
               onChange={(e) => setContatoNome(e.target.value)}
               placeholder='Nome do contato' />
      </label>
      <label>
        Email:
        <div id='bloco-email'>
            <div>
                <input type="email"
                       value={contatoEmail}
                       onChange={(e) => setContatoEmail(e.target.value)}
                       placeholder='Email' /> 
            </div>
            <div>
                <select value={tipoEmail} onChange={(e) => setTipoEmail(e.target.value)}>
                    <option value={""} disabled>Tipo do contato</option>
                    <option value={""} ></option>
                    <option value={"Pessoal"} >Pessoal</option>
                    <option value={"Comercial"}>Comercial</option>
                </select>
            </div>
        </div>
      </label>

      <label>
        Telefone:
        <div id='bloco-email'>
            <div>
                <input type="text"
                       value={contatoTelefone}
                       onChange={(e) => setContatoTelefone(e.target.value)}
                       placeholder='Telefone' /> 
            </div>
            <div>
                <select value={tipoTelefone} onChange={(e) => setTipoTelefone(e.target.value)}>
                    <option value={""} disabled>Tipo do contato</option>
                    <option value={""} ></option>
                    <option value={"Pessoal"} >Pessoal</option>
                    <option value={"Comercial"}>Comercial</option>
                </select>
            </div>
        </div>
      </label>

      <button onClick={(e) => handlerSubmit(e)}>Salvar</button>
      <button onClick={(e) => handlerExit(e)}>Fechar</button>
    </div>
  </div>  )
}

export default ModalAdicionarTelefone