import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import './main.sass'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraficoLinha({titulo, data}) {

  const options = {
    responsive: true, // Permite o ajuste responsivo do gráfico
    maintainAspectRatio: false, // Desabilita a manutenção da proporção do gráfico
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Valor: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Começar o eixo Y do zero
      },
    },
  };

  return (
    <div className='quadro-grafico'> 
      <h2 className='titulo'>{titulo}</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default GraficoLinha;
