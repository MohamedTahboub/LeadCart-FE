import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
// import dummyData from 'data/chartData.js';
// import moment from 'moment';
import './chart.css';
import PropTypes from 'prop-types';
// import { getDateValueReferences } from 'libs';
import { getLabelByValue } from 'data/dashboardSettings';

// const LoadingIcon = ({
//   className,
//   show,
//   ...props
// }) => (show ? <div className={`loading spinner ${className}`}>Loading...</div> : null);


// const isPercentageRequires = (type) => {
//   console.log('type==>', type);
// };
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

      tickAmount: 5
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
