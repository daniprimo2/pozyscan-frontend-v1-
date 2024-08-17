import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import './main.sass'
import { buscarLancamentosComFiltros, deletarLancamentos } from '../../services/Lancamento/Lancamento';
import { toast } from 'react-toastify';
import { RiDeleteBin5Line } from "react-icons/ri";
import LoadingSpinner from '../../components/Loading/LoadingSpinner';

function BuscaLancamentos() {
    const [numeroNf, setNumeroNf] = useState('')
    const [statusNotaFiscal, setStatusNotaFiscal] = useState('')
    const [listaLancamentos, setListaLancamentos] = useState([])
    const [loading, setLoading] = useState(false)

    const [atualizar, setAtualziar] = useState(false)
    
    const data = {
        numeroNf: numeroNf,
        statusNotaFiscal: statusNotaFiscal
    }

    const handlerBuscarLancamentos = (data) => {
        setLoading(true)

        buscarLancamentosComFiltros(data).then((resp) => {
            setListaLancamentos(resp.data)
            setLoading(false)

        }).catch(() => {
            setLoading(false)
            toast.error("API fora para buscar lancamentos")
        })
    }
    
    const handlerFilterNumeroNf = (event) => {
        setNumeroNf(event.target.value)
    }

    const handlerFilterNotaFiscal = (event) => {
        setStatusNotaFiscal(event.target.value)
    }

    
    const handleDelete = (event, id) => {
        event.preventDefault();
        setLoading(true)
        deletarLancamentos(id).then((resp) => {
            toast.success(resp.data.descricao)
            handlerBuscarLancamentos(data)
            setAtualziar(!atualizar)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
            toast.error("Não foi possivel mandar a reqquisição de delete")
        })
    }


    useEffect(() => {
        handlerBuscarLancamentos(data)
    }, [numeroNf, statusNotaFiscal, atualizar])

  return (
    <Layout>
        <div className="container">
            <h1>Lançamentos de dispesas</h1>
            <div className="list-component">
                <div className="filters">
                    <h2>Filtrar por: </h2>

                    <input type="text"
                               placeholder='Nº NF'
                               value={numeroNf}
                               onChange={handlerFilterNumeroNf}
                        />
                        
                    <input type="text"
                               placeholder='Status'
                               value={statusNotaFiscal}
                               onChange={handlerFilterNotaFiscal}
                        />
                </div>


                <table>
                <thead>
                    <th>Lancamento</th>
                    <th>Nº NF</th>
                    <th>Forma de pagamento</th>
                    <th>Valor Total</th>
                    <th>Proxima parcela</th>
                    <th>Vencimento P/parcela</th>
                    <th>Valor Parcela</th>
                    <th>Status</th>
                </thead>
                <tbody>
                    {listaLancamentos.map(item => (
                        <tr key={item.idLancamento}>
                            <td>{item.idLancamento}</td>
                            <td>{item.numeroNf}</td>
                            <td>{item.formaPagamento}</td>
                            <td>{item.valorTotal && "R$ "+item.valorTotal}</td>
                            <td>{item.statusParcela}</td>
                            <td>{item.vencProxParcela}</td>
                            <td>{item.valorParcela && "R$ "+ item.valorParcela}</td>
                            <td>{item.statusNotaFiscal}</td>
                            <td><RiDeleteBin5Line id="delete" onClick={(event) => handleDelete(event, item.idLancamento)}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
        {loading && <LoadingSpinner mensagem={"Carregando........"}/>}

    </Layout>
  )
}

export default BuscaLancamentos