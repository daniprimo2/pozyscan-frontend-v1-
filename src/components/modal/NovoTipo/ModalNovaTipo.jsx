import React, { useState } from 'react'
import { adicionarCategoria, adicionarTipo } from '../../../services/Veiculo/veiculo';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Loading/LoadingSpinner';

function ModalNovaTipo({mostrarModal}) {
    const [nomeTipo, setNomeTipo] = useState('');
    const [descricaoTipo, setDescricaoTipo] = useState('');
    const [loading, setLoading] = useState(false)


    const data = {
        nome: nomeTipo,
        descricao: descricaoTipo
    }

    const handlerAdicionarTipo = (data) => {
        adicionarTipo(data).then((resp) => {
            toast.success("Tipo " + resp.data.nome + " foi cadastrada com sucesso.")
            mostrarModal(false)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
            toast.error("Falha ao cadastrar tipo.")
        })
    }


    
    const handlerSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        handlerAdicionarTipo(data)
        mostrarModal(false)
    }


    const handlerExit = (e) => {
        e.preventDefault()
        mostrarModal(false)
    }

  return (
    <div className="modal-overlay">
        <div className="modal">
            <h2>Adicionar novo tipo</h2>
            <label>
                <input type="text"
                       value={nomeTipo}
                       onChange={(e) => setNomeTipo(e.target.value)}
                       placeholder='Nome tipo'/>
            </label>
            <label>
                <input type="text"
                       value={descricaoTipo}
                       onChange={(e) => setDescricaoTipo(e.target.value)}
                       placeholder='Descricao tipo'/>
            </label>

            <button onClick={(e) => handlerSubmit(e)}>Salvar</button>
            <button onClick={(e) => handlerExit(e)}>Fechar</button>
        </div>
        {loading && <LoadingSpinner mensagem={"Carregando........"}/>}

    </div>
  )
}

export default ModalNovaTipo