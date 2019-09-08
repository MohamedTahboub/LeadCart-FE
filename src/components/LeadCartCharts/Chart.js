import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import dummyData from 'data/chartData.js';
import moment from 'moment';
import './chart.css';


const AreaChart = ({
  data = [],
  activities = {},
  activeTypes = ['refunds'],
  timelineFilter,
}) => {
  const [series, setSeries] = useState([]);

  const options = {
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
        data
      }
    ]
  };


  const updateData = (timeline) => {
    switch (timeline) {
    case 'today':
      return {
        min: moment().subtract(1, 'days').endOf('day'),
        max: moment()
      };
    case 'yesterday ':
      return {
        min: moment().subtract(1, 'days'),
        max: moment().format()
      };
    case 'weekToDate':
      return {
        min: moment().subtract(7, 'days').endOf('day'),
        max: moment().format()
      };
    case 'lastWeek':
      return {
        min: moment().subtract(7, 'days'),
        max: moment().format()
      };
    case 'monthToDate':
      return {
        min: moment().subtract(1, 'months').endOf('month'),
        max: moment().format()
      };
    case 'lastMonth':
      return {
        min: moment().subtract(1, 'months'),
        max: moment().format()
      };
    case 'last3Months':
      return {
        min: moment().subtract(3, 'months'),
        max: moment().format()
      };
    case 'last6Months':
      return {
        min: moment().subtract(6, 'months'),
        max: moment().format()
      };
    case 'yearToDate':
      return {
        min: moment().subtract(1, 'years').endOf('year'),
        max: moment().format()
      };
    case 'lastYear':
      return {
        min: moment().subtract(1, 'years'),
        max: moment().format()
      };
    case 'currentFinancialYear':
      return {
        min: moment().subtract(1, 'years').endOf('year'),
        max: moment().format()
      };
    case 'previousFinancialYear':
      return {
        min: moment().subtract(2, 'years').endOf('year'),
        max: moment().subtract(1, 'years').endOf('year')
      };
    default: return {
      min: undefined,
      max: undefined
    };
    }
  };

  const updateSeriesWithActivities = (activities) => {
    const seriesData = activeTypes.map((type) => ({
      name: type.toUpperCase(),
      data: activities[type]
    }));

    setSeries(seriesData);
  };

  useEffect(() => {
    updateSeriesWithActivities(activities);
  }, [timelineFilter, activities]);

  return (
    <div id='chart'>
      <ApexCharts
        options={{
          ...options,
          options: {
            ...options.options,
            xaxis: updateData(timelineFilter)
          }
        }}
        series={series}
        type='area'
        height='350'
      />
    </div>
  );
};

export default AreaChart;
/*
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
        </div>`

*/
