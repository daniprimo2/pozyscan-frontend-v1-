import { useEffect, useState } from 'react'
import './main.sass'
import ReactInputMask from 'react-input-mask'
import { NumericFormat } from 'react-number-format'
import { adicionarNotaFiscal } from '../../../services/Lancamento/Lancamento'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../Loading/LoadingSpinner'


function AdicionarNotaFiscal({modalNotaFiscal, notaFiscal}) {
    const [numeroNf, setNumeroNf] = useState('')
    const [formaPagamento, setFormaPagamento] = useState('')
    const [valorNota, setValorNota] = useState('') // Inicialmente como string vazia
    const [dataPagamento, setDataPagamento] = useState('')
    const [quantidadeParcela, setQuantidadeParcela] = useState()
    const [comprovante, setComprovante] = useState('')
    const [loading, setLoading] = useState(false)


    const data = {
        numeroNotaFiscal: numeroNf,
        formaDePagamento: formaPagamento,
        valorTotalDaNota: valorNota,
        dataPagamento: dataPagamento,
        quantidadeDeParcelas: quantidadeParcela,
        comprovanteNF: comprovante
      }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Remove o prefixo "data:application/pdf;base64,"
                setComprovante(base64String);
            };
            
            reader.readAsDataURL(file);
        } else {
            alert('Por favor, selecione um arquivo PDF.');
        }
    };

    const handlerGerarNovaNF = (data) => {
        setLoading(true)
        adicionarNotaFiscal(data).then((resp) => {
            toast.success("Nota " + resp.data.numero + " gerada com sucesso.")
            notaFiscal(resp.data.numero)
            modalNotaFiscal(false)
            setLoading(false)

        }).catch((e) => {
            setLoading(false)

            toast.error("Nota não foi gerada")
        })
    }

    const handleValorNotaChange = (values) => {
        const { value } = values;
        setValorNota(value);
    };

    
    const handlerSubmit = (e) => {
        e.preventDefault()
        handlerGerarNovaNF(data)
    }

    useEffect(() => {
    }, [valorNota]);

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Adicionar Nota Fiscal</h2>
                <label>
                    Nome:
                    <input
                        type="text"
                        value={numeroNf}
                        onChange={(e) => setNumeroNf(e.target.value)}
                        placeholder='Nº Nota Fiscal'
                    />
                </label>
                <label>
                    Qual forma de pagamento:
                    <div>
                    <select value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)}>
                        <option value="" disabled>Forma de Pagamento</option>
                        <option value="A_VISTA">Ávista</option>
                        <option value="A_VISTA_A_PRAZO">Avista com prazo</option>
                        <option value="PARCELADO">Parcelado</option>
                    </select>
                </div>
                </label>
                <label>
                    Valor total da nota:
                    <NumericFormat
                        value={valorNota}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        onValueChange={handleValorNotaChange}
                        placeholder="Valor da nota *R$ 0,00"
                        decimalScale={2}
                        fixedDecimalScale={true}
                    />
                </label>
                <label>
                    Data do vencimento da parcela:
                    <ReactInputMask mask={"99/99/9999"} placeholder='Data do vencimento' value={dataPagamento} onChange={(e) => setDataPagamento(e.target.value)}/>
                </label>
                <label>
                <div>
                    Em quantas vezes deseja parcelas:
                    <select value={quantidadeParcela} onChange={(e) => setQuantidadeParcela(e.target.value)}>
                        <option value="" disabled>Quantidade de Parcela</option>
                        <option value={0}></option>
                        <option value={2}>2x</option>
                        <option value={3}>3x</option>
                        <option value={5}>5x</option>
                        <option value={7}>7x</option>
                        <option value={10}>10x</option>
                        <option value={12}>12x</option>
                    </select>
                </div>
                </label>

                <label>
                    Comprovante PDF:
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                    />
                </label>
                {comprovante && (<button className='botao' onClick={(e) => handlerSubmit(e)}>ADD NF</button>)}
            </div>


            {loading && <LoadingSpinner mensagem={"Carregando........"}/>}

        </div>
        
    );
}

export default AdicionarNotaFiscal;
