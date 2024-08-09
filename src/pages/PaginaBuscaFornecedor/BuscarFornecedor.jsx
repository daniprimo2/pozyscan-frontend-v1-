import { useEffect, useState } from 'react';
import './main.sass'
import Layout from '../../components/Layout/Layout';
import { buscarFornecedor, deletarFornecedor } from '../../services/fornecedor/fornecedor';
import { RiDeleteBin5Line } from "react-icons/ri";

import { toast } from 'react-toastify';

function BuscarFornecedor() {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginas, setPaginas] = useState(1);
    const [atualizar, setAtualziar] = useState(false)

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [id, setId] = useState('');
    const [listaFornecedores, setListaFornecedores] = useState([])

    const data = {
        nomeFornecedor: nome,
        cnpjFornecedor: cnpj,
        idFornecedor: id
    }

    const handlerBuscarFornecedor = (data, page) => {
        buscarFornecedor(data, page).then((resp) => {
                setListaFornecedores(resp.data.content)
                setPaginas(resp.data.totalPages)
        }).catch((e) => {

        })
    }

    useEffect(() => {
        handlerBuscarFornecedor(data, currentPage)
    },[currentPage, nome, cnpj, id, atualizar])


    const handlerFilterNome = (event) => {
        setNome(event.target.value)
    }

    const handlerFilterCnpj = (event) => {
        setCnpj(event.target.value)
    }
    
    const handlerFilterId = (event) => {
        setId(event.target.value)
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      const deletarFornecedorPorId = (id) => {
        deletarFornecedor(id).then((resp) => {
            toast.success(resp.data.descricao)
            setAtualziar(!atualizar)
        }).catch((e) => {
            toast.error("Falha ao deletar")
        })  
      }
    
      const handleDelete = (event, id) => {
        event.preventDefault();
        deletarFornecedorPorId(id)
        handlerBuscarFornecedor(data, currentPage)
      }

  return (
    <Layout>
        <div className="container">
            <div className="list-component">
                <div className="filters">
                    <h2>Filtrar por:</h2>
                    <div>
                        <input type="text"
                               placeholder='Nome'
                               value={nome}
                               onChange={handlerFilterNome}
                        />
                        <input type="text"
                               placeholder='CNPJ'
                               value={cnpj}
                               onChange={handlerFilterCnpj}
                        />
                        <input type="text"
                               placeholder='Id'
                               value={id}
                               onChange={handlerFilterId}
                        />
                    </div>
                </div>

                <table>
                    <thead>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Numero CNPJ</th>
                        <th>Opções</th>
                    </thead>
                    <tbody>
                        {listaFornecedores.map(item => (
                            <tr key={item.id}>
                                <td id='idStyles'>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.cnpj}</td>
                                <td><RiDeleteBin5Line id="delete" onClick={(event) => handleDelete(event, item.id)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    {Array.from({ length: paginas }, (_, index) => (
                        <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                        >
                        {index + 1}
                        </button>
                    ))}
                </div>


            </div>
        </div>
    </Layout>
  )
}

export default BuscarFornecedor