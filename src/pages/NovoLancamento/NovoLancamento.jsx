import './main.sass'
import Layout from "../../components/Layout/Layout"
import { RiUserAddFill } from "react-icons/ri";
import InputSelect from "../../components/input/ImputSelect/InputSelect";
import InputPadrao from "../../components/input/InputPadrao/InputPadrao";
import { useEffect, useState } from 'react';
import { buscarAsNotas, buscarOpcoesSelects, salvarLancamento } from '../../services/Lancamento/Lancamento';
import AdicionarNotaFiscal from '../../components/modal/AdicionarNotaFiscal/AdicionarNotaFiscal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function NovoLancamento() {
    const navigate = useNavigate()
    const [isModalAdicioanrNotaFiscal, setIsModalAdicioanrNotaFiscal] = useState(false);

    const [placa, setPlaca] = useState('')
    const [listaOpcoesPlaca, setListaOpcoesPlaca] = useState([])

    const [aplicacao, setAplicacao] = useState()
    const [listaOpcoesAplicacoes, setListaOpcoesAplicacoes] = useState([])

    
    const [filial, setFilial] = useState()
    const [listaOpcoesFiliais, setListaOpcoesFiliais] = useState([])

    
    const [fornecedores, setFornecedores] = useState()
    const [listaOpcoesFornecedores, setListaOpcoesFornecedores] = useState([])

    const [centroCusto, setCentroCusto] = useState('')

    const [numeroNotaFiscal, setNumeroNotaFiscal] = useState('')
    const [listaDasNotasFiscais, setListaDasNotasFiscais] = useState([])

    const [mostrarNotaFiscal, setMostrarNotaFiscal] = useState(false)


    const data = {
        aplicacaoId: aplicacao,
        filialId: filial,
        placaVeiculo: placa,
        fornecedorId: fornecedores,
        centroCusto: centroCusto,
        notaFiscalId: numeroNotaFiscal
    }


    const transformarPlaca = (opcoes) => {
        return opcoes.map(opcao => ({
            nome: opcao.placa,
            value: opcao.placa
        }))
    }

    const transformarAplicacoes = (opcoes) => {
        return opcoes.map(opcao => ({
            nome: opcao.nomeAplicacao,
            value: opcao.idAplicacao
        }))
    }
    
    const transformarFiliais = (opcoes) => {
        return opcoes.map(opcao => ({
            nome: opcao.nomeFilial,
            value: opcao.idFilial
        }))
    }
    
    const transformarFornecedores = (opcoes) => {
        return opcoes.map(opcao => ({
            nome: opcao.nomeFornecedor,
            value: opcao.idFornecedor
        }))
    }



    const handlerCarregarOpcoes = () => {
        buscarOpcoesSelects().then((resp) => {
            setListaOpcoesPlaca(transformarPlaca(resp.data.placas))
            setListaOpcoesAplicacoes(transformarAplicacoes(resp.data.aplicacoes))
            setListaOpcoesFiliais(transformarFiliais(resp.data.filiais))
            setListaOpcoesFornecedores(transformarFornecedores(resp.data.fornecedores))
        }).catch((e) => {

        })
    }

    const handlerCarregarNotasFiscais = (numero) => {
        buscarAsNotas(numero).then((resp) => {
            setListaDasNotasFiscais(resp.data)
            setMostrarNotaFiscal(true)
        }).catch(() => {
        })
    }

    useEffect(() => {
        handlerCarregarOpcoes()
        handlerCarregarNotasFiscais(numeroNotaFiscal)
    }, [numeroNotaFiscal])

    const handlerSubmit = (e) => {
        e.preventDefault()
        setIsModalAdicioanrNotaFiscal(true)
    }

    
    const handlerSubmitSalvarLancamento = (e) => {
        e.preventDefault()
        salvarLancamento(data).then((resp) => {
            navigate(0)
            toast.success(resp.data.descricao);
        }).catch(() => {})
    }


  return (
    <Layout>
        <div className="container">
            <h1><RiUserAddFill/> Novo Lancamento</h1>
            <div className="sessoes">
            <InputSelect label={"Selecione Placa: "}
                             placeholder={"Placa"}
                             listaOpcoes={listaOpcoesPlaca}
                             dado={placa}
                             setDado={setPlaca}/>
            <InputSelect label={"Selecione Aplicação: "}
                             placeholder={"Aplicação"}
                             listaOpcoes={listaOpcoesAplicacoes}
                             dado={aplicacao}
                             setDado={setAplicacao}/>
            <InputSelect label={"Selecione Filial: "}
                            placeholder={"Filial"}
                            listaOpcoes={listaOpcoesFiliais}
                            dado={filial}
                            setDado={setFilial}/>                                              
            </div>
            <div className="sessoes">
            <InputSelect label={"Selecione Fornecedor: "}
                             placeholder={"Fornecedor"}
                             listaOpcoes={listaOpcoesFornecedores}
                             dado={fornecedores}
                             setDado={setFornecedores}/>
            <InputPadrao type={'text'} label={"Centro de custo"} dado={centroCusto} setDado={setCentroCusto}/>
                <button className='botao' onClick={(e) => handlerSubmit(e)}>Adicionar NF</button>
            </div>



            <div className="sessoes quadro">
              {mostrarNotaFiscal != 0 ? 
                  <table>
                    <thead>
                        <tr>
                            <th>Nº da NF</th>
                            <th>Data de emissão</th>
                            <th>Parcela</th>
                            <th>Data do pagamento</th>
                            <th>Status pagamento</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaDasNotasFiscais.map(item => (
                            <tr key={item.numeroNf}>
                                <td id='idUsuario'>{item.numeroNf}</td>
                                <td id='nomeUsuario'>{item.dataEmissao}</td>
                                <td>{item.descricaoParcela}</td>
                                <td>{item.dataDePagamento}</td>
                                <td>{item.statusPagamento}</td>
                                <td>{item.valorDoPagamento}</td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                   : <div className='sem-contato'>Não contem Nota Fiscal Informada.</div>} 
            </div>

            {mostrarNotaFiscal != 0 ? 
            <div className='sessoes button'>
                <button className='botao' onClick={(e) => handlerSubmitSalvarLancamento(e)}>Salvar Lancamento</button>
            </div> : <div></div>}                    
            {isModalAdicioanrNotaFiscal && <AdicionarNotaFiscal modalNotaFiscal={setIsModalAdicioanrNotaFiscal} notaFiscal={setNumeroNotaFiscal}/>}

        </div>
    </Layout>
  )
}

export default NovoLancamento