import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import './main.sass'
import { buscarAsPecelas, buscarLancamentosComFiltros } from '../../services/Lancamento/Lancamento';
import { toast } from 'react-toastify';
import { RiDeleteBin5Line } from "react-icons/ri";

function BuscaParcelas() {
    const [numeroNf, setNumeroNf] = useState('')
    const [statusNotaFiscal, setStatusNotaFiscal] = useState('')
    const [centroDeCusto, setCentroDeCusto] = useState('')
    const [dataVencimento, setDataDeVencimento] = useState('')
    const [listaLancamentos, setListaLancamentos] = useState([])
    
    const data = {
        numeroNotaFiscal: numeroNf,
        statusPagamentos: statusNotaFiscal,
        centroDeCusto: centroDeCusto,
        dataVencimento: dataVencimento
    }

    const handlerBuscarLancamentos = (data) => {
        console.log(data)
        buscarAsPecelas(data).then((resp) => {
            setListaLancamentos(resp.data)
        }).catch(() => {
            toast.error("API fora para buscar lancamentos")
        })
    }
    
    const handlerFilterNumeroNf = (event) => {
        setNumeroNf(event.target.value)
    }

    const handlerFilterNotaFiscal = (event) => {
        setStatusNotaFiscal(event.target.value)
    }

    const handlerFilterCentroDeCusto = (event) => {
        setCentroDeCusto(event.target.value)
    }

    const handlerFilterDataVencimento = (event) => {
        setDataDeVencimento(event.target.value)
    }

    
    const handleDelete = (event, id) => {
        event.preventDefault();
    }


    useEffect(() => {
        setListaLancamentos([])
        handlerBuscarLancamentos(data)
    }, [numeroNf, statusNotaFiscal, dataVencimento, centroDeCusto])

  return (
    <Layout>
        <div className="container">
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
                        
                        
                    <input type="text"
                               placeholder='Centro de custo'
                               value={centroDeCusto}
                               onChange={handlerFilterCentroDeCusto}
                        />
                        
                        
                    <input type="text"
                               placeholder='Data de vencimento'
                               value={dataVencimento}
                               onChange={handlerFilterDataVencimento}
                        />
                </div>


                <table>
                <thead>
                    <th>Nº NF</th>
                    <th>Lancamento</th>
                    <th>Centro de custo</th>
                    <th>Vencimento</th>
                    <th>Descricao parcela</th>
                    <th>Status</th>
                    <th>Valor</th>
                </thead>
                <tbody>
                    {listaLancamentos.map(item => (
                        <tr key={item.notaFiscalNumeroNf}>
                            <td>{item.notaFiscalNumeroNf}</td>
                            <td>{item.idLancamento}</td>
                            <td>{item.centroDeCusto}</td>
                            <td>{item.dataVencimento}</td>
                            <td>{item.descricaoParcela}</td>
                            <td>{item.statusPagamento}</td>
                            <td>{item.valorParcela && "R$ "+item.valorParcela}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>



        </div>
    </Layout>
  )
}

export default BuscaParcelas