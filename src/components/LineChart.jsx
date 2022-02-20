import React from 'react'
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
 const coinPrice = [];
  const coinTimestamp = [];


  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

const  options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}

  return (
    <>
        <h5 className="text-gray-700 text-xl leading-tight font-medium mb-2">{coinName} Price Chart</h5>
          <div className="flex items-center justify-between">
          <p className="text-gray-500 text-base mb-4">Change: {coinHistory?.data?.change}%</p>
          <p className="text-gray-500 text-base mb-4">Current {coinName} Price: $ {currentPrice}</p>
          </div>
     <Line data={data} options={options} />
    </>
  )
}

export default LineChart