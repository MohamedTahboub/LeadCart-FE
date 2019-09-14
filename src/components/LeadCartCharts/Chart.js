import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import dummyData from 'data/chartData.js';
import moment from 'moment';
import './chart.css';
import PropTypes from 'prop-types';
import { getDateValueReferences } from 'libs';
import { getLabelByValue } from 'data/dashboardSettings';

const LoadingIcon = ({
  className,
  show,
  ...props
}) => (show ? <div className={`loading spinner ${className}`}>Loading...</div> : null);


const isPercentageRequires = (type) => {
  console.log('type==>', type);
};
const AreaChart = ({
  data = [],
  activeTypeValue,
  display,
  timelineFilter,
}) => {
  const initialState = {
    // timeline: getDateValueReferences(timelineFilter) || {},
    series: [
      {
        name: activeTypeValue,
        data
      }
    ]
  };
  const [state, setState] = useState(initialState);

  const options = {
    chart: {
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 3,
      style: 'hollow'
    },
    xaxis: {
      type: 'datetime',
      // x: getDateValueReferences(timelineFilter).min,
      min: undefined,
      max: undefined,

      tickAmount: 1
    },
    // yaxis: {
    //   labels: {
    //     formatter: (value) => {
    //       if (isPercentageRequires(activeTypeValue)) return `${value.toFixed(0)}%`;
    //       return value.toFixed(0);
    //     },
    //   },
    // },
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
  };


  // const updateData = (timeline) => {
  //   switch (timeline) {
  //   case 'today':
  //     return {
  //       min: moment().subtract(1, 'days').endOf('day'),
  //       max: moment()
  //     };
  //   case 'yesterday ':
  //     return {
  //       min: moment().subtract(1, 'days'),
  //       max: moment().format()
  //     };
  //   case 'weekToDate':
  //     return {
  //       min: moment().subtract(7, 'days').endOf('day'),
  //       max: moment().format()
  //     };
  //   case 'lastWeek':
  //     return {
  //       min: moment().subtract(7, 'days'),
  //       max: moment().format()
  //     };
  //   case 'monthToDate':
  //     return {
  //       min: moment().subtract(1, 'months').endOf('month'),
  //       max: moment().format()
  //     };
  //   case 'lastMonth':
  //     return {
  //       min: moment().subtract(1, 'months'),
  //       max: moment().format()
  //     };
  //   case 'last3Months':
  //     return {
  //       min: moment().subtract(3, 'months'),
  //       max: moment().format()
  //     };
  //   case 'last6Months':
  //     return {
  //       min: moment().subtract(6, 'months'),
  //       max: moment().format()
  //     };
  //   case 'yearToDate':
  //     return {
  //       min: moment().subtract(1, 'years').endOf('year'),
  //       max: moment().format()
  //     };
  //   case 'lastYear':
  //     return {
  //       min: moment().subtract(1, 'years'),
  //       max: moment().format()
  //     };
  //   case 'currentFinancialYear':
  //     return {
  //       min: moment().subtract(1, 'years').endOf('year'),
  //       max: moment().format()
  //     };
  //   case 'previousFinancialYear':
  //     return {
  //       min: moment().subtract(2, 'years').endOf('year'),
  //       max: moment().subtract(1, 'years').endOf('year')
  //     };
  //   default: return {
  //     min: undefined,
  //     max: undefined
  //   };
  //   }
  // };

  useEffect(() => {
    // console.log('Charts Updates');
    // console.log(data);
    setState({
      // timeline: getDateValueReferences(timelineFilter) || {},
      series: [
        {
          name: getLabelByValue(activeTypeValue),
          data
        }
      ]
    });
  }, [timelineFilter, data]);

  return display ? (
    <div className='dashboard-main-chart' id='chart'>
      <ApexCharts
        options={options}
        series={state.series}
        type='area'
        height='250'
        loading
      />
    </div>
  )
    : null;
};


AreaChart.propTypes = {
  data: PropTypes.arrayOf({}),
  activeTypeValue: PropTypes.string.isRequired,
  timelineFilter: PropTypes.string.isRequired,
};
AreaChart.defaultProps = {
  data: []
};

export default AreaChart;
/*
      <LoadingIcon className='chart-loading' show />


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
