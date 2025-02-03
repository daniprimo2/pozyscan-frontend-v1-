import React from 'react'
import { Chart as ChartJS,
         CategoryScale,
         LinearScale,
         BarElement, 
         Title, 
         Tooltip, 
         Legend } from 'chart.js';

import './main.sass'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function GraficoTabelar({data}) {
  return (
    <div className='bloco'>
      <h2 className='titulo'>Dispesas por veiculo</h2>
      <table border="1" cellPadding="10" className='tabela'>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Dispesa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td id='placa'>{item.placa}</td>
              <td>{item.modelo}</td>
              <td>
                {item.valor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}

export default GraficoTabelar