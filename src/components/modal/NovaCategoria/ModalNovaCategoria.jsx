import React, { useState } from 'react'
import { adicionarCategoria } from '../../../services/Veiculo/veiculo';
import { toast } from 'react-toastify';

function ModalNovaCategoria({mostrarModal}) {
    const [nomeCategoria, setNomeCategoria] = useState('');
    const [descricaoCategoria, setDescricaoCategoria] = useState('');

    const data = {
        nome: nomeCategoria,
        descricao: descricaoCategoria
    }

    const handlerAdicionarCategoria = (data) => {
        adicionarCategoria(data).then((resp) => {
            toast.success("Categoria " + resp.data.nome + " foi cadastrada com sucesso.")
            mostrarModal(false)
        }).catch((e) => {
            toast.error("Falha ao cadastrar categoria.")
        })
    }


    
    const handlerSubmit = (e) => {
        e.preventDefault()
        handlerAdicionarCategoria(data)
        mostrarModal(false)
    }


    const handlerExit = (e) => {
        e.preventDefault()
        mostrarModal(false)
    }

  return (
    <div className="modal-overlay">
        <div className="modal">
            <h2>Adicionar nova categoria</h2>
            <label>
                <input type="text"
                       value={nomeCategoria}
                       onChange={(e) => setNomeCategoria(e.target.value)}
                       placeholder='Nome categoria'/>
            </label>
            <label>
                <input type="text"
                       value={descricaoCategoria}
                       onChange={(e) => setDescricaoCategoria(e.target.value)}
                       placeholder='Descricao categoria'/>
            </label>

            <button onClick={(e) => handlerSubmit(e)}>Salvar</button>
            <button onClick={(e) => handlerExit(e)}>Fechar</button>
        </div>
    </div>
  )
}

export default ModalNovaCategoria