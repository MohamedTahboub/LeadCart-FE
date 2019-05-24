import React from 'react';
import { Line } from 'react-chartjs-2';
import "./style.css";




const data = {
  scaleShowLabels: false,
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nav', 'Dec'],
  datasets: [
    {
      displayLabel: false,
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      strokeColor: 'rgba(0,0,0,0)',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#ff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [100, 400, 270, 560, 700, 520, 710, 1000, 910, 810, 870,
        920, 500, 1200, 1270, 2900, 1741, 1621, 2140, 2700, 2400,
        2900, 3000, 2000, 2100, 2400, 2417, 2000, 520, 710, 1000, 910, 810]
    }
  ],
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ]
  }
};

export const LineChart = props => (
  <Line data={data} />
)



export { default as Chart } from './chart' 