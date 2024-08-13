import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import InputPadrao from '../../../components/input/InputPadrao/InputPadrao'
import './main.sass'
import { IoMdAddCircle } from "react-icons/io";
import ImputSelectAdicionarTipo from '../../../components/input/ImputSelectAdicionarTipo/ImputSelectAdicionarTipo';
import { adicionarVeiculo, buscarTodosCategoria, buscarTodosTipos } from '../../../services/Veiculo/veiculo';
import ModalAdicionarTelefone from '../../../components/modal/AdicionarTelefone/ModalAdicionarTelefone';
import ModalNovaCategoria from '../../../components/modal/NovaCategoria/ModalNovaCategoria';
import ModalNovaTipo from '../../../components/modal/NovoTipo/ModalNovaTipo';
import { toast } from 'react-toastify';
import BuscarVeiculos from '../../../components/Tabela/BuscarVeiculos/BuscarVeiculos';


function NovoVeiculo() {
    const [placa, setPlaca] = useState('')
    const [modelo, setModelo] = useState('')
    const [ano, setAno] = useState('')
    const [tipo, setTipo] = useState()
    const [categoria, setCategoria] = useState()


    const [listaTipos, setListaTipos] = useState([])
    const [listaCategoria, setListaCategoria] = useState([])

    const [atualizar, setAtualizar] = useState(false)


    const [isModalOpenTipo, setIsModalOpenTipo] = useState(false);
    const [isModalOpenCategoria, setIsModalOpenCategoria] = useState(false);


    const data = {
        placa: placa,
        modelo: modelo,
        ano: ano,
        categoria_id: categoria,
        tipo_id: tipo
      }

    const handlerAdicionarNovoVeiculo = (data) => {
        adicionarVeiculo(data).then((resp) => {
            toast.success('Veiculo de placa '+ resp.data.placa 
            + " registrada com sucesso.")
            setAtualizar(!atualizar)
        }).catch((e) => {
            toast.error("Veiculo não foi registrado.")
        })
    }


    const handlerBuscaOsTipos = () => {
        buscarTodosTipos().then((resp) => {
            setListaTipos(resp.data)

        }).catch((e) => {

        })
    }

    const handlerBuscaAsCategorias = () => {
        buscarTodosCategoria().then((resp) => {
            setListaCategoria(resp.data)
        }).catch((e) => {

        })
    }

    const handlerSubmit = (event) => {
        event.preventDefault()
        console.log(data)
        handlerAdicionarNovoVeiculo(data)
        setPlaca('')
        setModelo('')
        setAno('')
    }

    const handlerAtualizar = () => {setAtualizar(!atualizar)}
    const modalTipo = () => {
        setIsModalOpenTipo(!isModalOpenTipo)
        handlerBuscaOsTipos()
    }
    const modalCategoria = () => {
        setIsModalOpenCategoria(!isModalOpenCategoria)
        handlerBuscaAsCategorias()
    }

    useEffect(() => {
        handlerBuscaOsTipos()
        handlerBuscaAsCategorias()

    }, [atualizar, isModalOpenTipo, isModalOpenCategoria])

  return (
    <Layout>
        <div className="container">
            <h1>Add Veiculo</h1>
            <div className="sessoes">
                <InputPadrao  type={'text'} label={"Placa"} dado={placa} setDado={setPlaca}/>
                <InputPadrao  type={'text'} label={"Modelo"} dado={modelo} setDado={setModelo}/>
            </div>
            <div className="sessoes">
                <InputPadrao  type={'text'} label={"ano"} dado={ano} setDado={setAno}/>
                <ImputSelectAdicionarTipo   
                             label={"Selecione Categoria do veiculo: "}
                             placeholder={"Categoria do veiculo"}
                             listaOpcoes={listaCategoria}
                             dado={categoria}
                             setDado={setCategoria}
                             controleModal={modalCategoria}
                             atualizar={handlerAtualizar}/>
                <ImputSelectAdicionarTipo   
                             label={"Selecione Tipo do veiculo: "}
                             placeholder={"Tipo do veiculo"}
                             listaOpcoes={listaTipos}
                             dado={tipo}
                             setDado={setTipo}
                             controleModal={modalTipo}
                             atualizar={handlerAtualizar}/>
            </div>

            <div className='sessoes button'>
                <button className='botao' onClick={(e) => handlerSubmit(e)}>Adicionar</button>
            </div>

            <BuscarVeiculos atualziarPeloAdicionar={atualizar}/>


            {isModalOpenCategoria && <ModalNovaCategoria mostrarModal={modalCategoria}/>}
            {isModalOpenTipo && <ModalNovaTipo mostrarModal={modalTipo}/>}


        </div>
    </Layout>
  )
}

export default NovoVeiculo