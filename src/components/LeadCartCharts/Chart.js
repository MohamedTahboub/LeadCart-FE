import React, { Component } from 'react';
import ApexCharts from 'react-apexcharts';
import dummyData from 'data/chartData.js';
import moment from 'moment';
import './chart.css';


class AreaChart extends Component {
  state = {
    selection: 'one_year',
    options: {
      // annotations: {
      //   yaxis: [
      //     {
      //       y: 30,
      //       borderColor: '#999',
      //       label: {
      //         show: false,
      //         text: 'Support',
      //         style: {
      //           color: '#fff',
      //           background: '#00E396'
      //         }
      //       }
      //     }
      //   ],
      //   xaxis: [
      //     {
      //       x: new Date('14 Nov 2012').getTime(),
      //       borderColor: '#999',
      //       yAxisIndex: 0,
      //       label: {
      //         show: true,
      //         text: 'Rally',
      //         style: {
      //           color: '#fff',
      //           background: '#775DD0'
      //         }
      //       }
      //     }
      //   ]
      // },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
        style: 'hollow'
      },
      xaxis: {
        type: 'datetime',
        min: new Date('01 Mar 2018').getTime(),
        tickAmount: 6
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      colors: ['#4DA1FF'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }
    },
    series: [
      {
        data: dummyData()
      }
    ]
  };


  updateData (timeline) {
    this.setState({
      selection: timeline
    });

    switch (timeline) {
    case 'one_month':
      this.setState({
        options: {
          xaxis: {
            min: new Date('01 May 2019').getTime(),
            max: moment()
          }
        }
      });
      break;
    case 'quarter ':
      this.setState({
        options: {
          xaxis: {
            min: new Date('01 Feb 2019').getTime(),
            max: moment().format()
          }
        }
      });
      break;
    case 'six_months':
      this.setState({
        options: {
          xaxis: {
            min: new Date('01 Dec 2018').getTime(),
            max: moment().format()
          }
        }
      });
      break;
    case 'one_year':
      this.setState({
        options: {
          xaxis: {
            min: new Date('01 May 2018').getTime(),
            max: moment().format()
          }
        }
      });
      break;
    case 'ytd':
      this.setState({
        options: {
          xaxis: {
            min: new Date('01 Jan 2019').getTime(),
            max: moment().format()
          }
        }
      });
      break;
    case 'all':
      this.setState({
        options: {
          xaxis: {
            min: undefined,
            max: undefined
          }
        }
      });
      break;
    default:
    }
  }

  render () {
    return (
      <div id='chart'>
        <div className='chart-toolbar '>
          <button
            onClick={() => this.updateData('one_month')}
            id='one_month'
            className={`chart-view-period-btn ${this.state.selection === 'one_month' ? 'active' : ''}`}
          >
            last month
          </button>
          <button
            onClick={() => this.updateData('six_months')}
            id='six_months'
            className={`chart-view-period-btn ${this.state.selection === 'six_months' ? 'active' : ''}`}
          >
            last 6 months
          </button>
          <button
            onClick={() => this.updateData('quarter ')}
            id='quarter '
            className={`chart-view-period-btn ${this.state.selection === 'quarter ' ? 'active' : ''}`}
          >
            This Quarter
          </button>
          <button
            onClick={() => this.updateData('one_year')}
            id='one_year'
            className={`chart-view-period-btn ${this.state.selection === 'one_year' ? 'active' : ''}`}
          >
            last year
          </button>
          <button
            onClick={() => this.updateData('ytd')}
            id='ytd'
            className={`chart-view-period-btn ${this.state.selection === 'ytd' ? 'active' : ''}`}
          >
            current year
          </button>
          <button
            onClick={() => this.updateData('all')}
            id='all'
            className={`chart-view-period-btn ${this.state.selection === 'all' ? 'active' : ''}`}
          >
            All
          </button>
        </div>
        <ApexCharts
          options={this.state.options}
          series={this.state.series}
          type='area'
          height='350'
        />
      </div>
    );
  }
}

export default AreaChart;
