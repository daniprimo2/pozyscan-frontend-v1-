import { useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout"
import PaginaEmDesenvolvimento from "../EmDesenvolvimento/PaginaEmDesenvolvimento"
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { GiExpense } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaTruckMoving } from "react-icons/fa";
import './main.sass'
import QuadroAP from "../../components/Dashboard/Quadro-Apresentacao/QuadroAP";
import GraficoLinha from "../../components/Dashboard/GraficoLinha/GraficoLinha";
import GraficoTabelar from "../../components/Dashboard/GraficoTabelar/GraficoTabelar";
import { informacoesDashboard } from "../../services/dasgboard/DashBoard";
import QuadroVeiculos from "../../components/Dashboard/Quadro-Veiculos/QuadroVeiculos";


function PaginaHome() {
  const [loading, setLoading] = useState(true);

  const [labels, setLabels] = useState([])
  const [dados, setDados] = useState([])

  const [veiculos, setVeiculos] = useState([])

  const [totalDispesa, setTotalDispesa] = useState()
  const [totalDeDispesasPagas, setTotalDeDispesasPagas] = useState()
  const [totalDeDispesasAPagar, setTotalDeDispesasAPagar] = useState()
  const [totalVeiculos, setTotalVeiculos] = useState()
  const [frotaPropria, setFrotaPropria] = useState()
  const [frotaAgregada, setFrotaAgregada] = useState()




  useEffect(() => {
      informacoesDashboard().then((resp) => {
        
        setTotalDispesa(resp.data.totalDeDispesas)
        setTotalDeDispesasPagas(resp.data.totalDeDispesasPagas)
        setTotalDeDispesasAPagar(resp.data.totalDeDispesasAPagar)
        setTotalVeiculos(resp.data.totalVeiculos)
        setFrotaPropria(resp.data.frotaPropria)
        setFrotaAgregada(resp.data.frotaAgregada)


        const newLabels = [];
        const newDados = [];

        resp.data.aplicacoes.forEach((dado) => {
          newLabels.push(dado.aplicacao);
          newDados.push(Number(dado.dispesaTotal)); // Converte para número
        });

        setLabels(newLabels);
        setDados(newDados);




        const newVeiculos = [];

        resp.data.veiculos.map((resp) => {
          newVeiculos.push({ placa: resp.placaVeiculo,
                             modelo: resp.modeloVeiculo,
                             valor: resp.dispesaTotal})
        })

        setVeiculos(newVeiculos)


      }).catch(() => {
        console.log("deu ruim")
      })

    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])




  const dataLinha = {
    labels: labels, // Rótulos do eixo X
    datasets: [
      {
        label: 'Aplicações', // Nome do dataset
        data: dados, // Dados para o gráfico
        fill: false, // Não preencher a área abaixo da linha
        borderColor: '#251953fa', // Cor da linha
        tension: 0.1, // Curvatura da linha
      },
    ],
  };

  console.log(veiculos)
      
  const data = veiculos;



  return (
    <Layout>
      <div className="quadros">

        <QuadroAP 
          titulo={"Dispesas Totais"}
          valor={totalDispesa}
          descricao={"Total de dispesas"}
          icone={<GiExpense />}
          cor={"black"}
        />

        
        <QuadroAP 
          titulo={"Dispesas Pagas"}
          valor={totalDeDispesasPagas}
          descricao={"Total de dividas pagas"}
          icone={<FcMoneyTransfer />}
          cor={"#251953fa"}
        />

        
<QuadroAP 
          titulo={"Dispesas a pagar"}
          valor={totalDeDispesasAPagar}
          descricao={"Total de dispesas que precisam ser pagas"}
          icone={<FaMoneyBillTrendUp />}
          cor={"black"}
        />

        
        <QuadroVeiculos 
          titulo={"Veiculos"}
          total={totalVeiculos}
          propria={frotaPropria}
          agregado={frotaAgregada}
          descricao={"Total de Veiculos"}
          icone={<FaTruckMoving />}
          cor={"#251953fa"}
        />
      </div>

      <div className="graficos">
        <GraficoLinha 
            className='grafico-linha' 
            titulo='Gráfico de dispesas por aplicação' 
            data={dataLinha} />
        <GraficoTabelar 
            data={data} />
      </div>

    </Layout>
  )
}

export default PaginaHome

/*

      {loading ? (<LoadingSpinner mensagem={"Carregando pagina home"}/>):(<PaginaEmDesenvolvimento />)}

*/