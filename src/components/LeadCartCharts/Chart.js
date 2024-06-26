import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { getCurrencySymbol } from 'libs';

import { getFormatByValue, getLabelByValue } from 'data/dashboardSettings';
import './chart.css';

const AreaChart = ({
  data = [],
  activeTypeValue,
  display,
  timelineFilter,
  currency
}) => {
  const currencySymbol = getCurrencySymbol(currency);

  const initialState = {
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
      type: 'area',
      zoom: { enabled: false },
      toolbar: { show: false }
    },

    dataLabels: { enabled: false },

    markers: {
      size: 2,
      style: 'hollow'
    },

    xaxis: {
      type: 'datetime',
      min: undefined,
      max: undefined,
      tickAmount: 1
    },

    tooltip: {
      x: { format: 'dd MMM yyyy', show: false },

      y: [{
        formatter: (value, data) => {
          const { w: { globals: { seriesNames } } } = data;
          const [seriesName] = seriesNames;
          if (seriesName === 'Checkout Views')
            return `${value} view`;
          else if (seriesName === 'Net Revenue' || seriesName === 'Gross Revenue')
            return `${currencySymbol}${value}`;
          else if (seriesName === 'Conversion Rate' || seriesName === 'abandonmentsRate' || seriesName === 'refundRate')
            return `${value}%`;
          else
            return value;

        }
      }]
    },

    stroke: { curve: 'straight' },

    fill: {
      type: 'gradient',
      colors: ['#4DA1FF'],
      gradient: {
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    }
  };


  useEffect(() => {
    setState({
      series: [
        {
          name: getLabelByValue(activeTypeValue),
          data: data.map(([first, second]) => [first, numeral(second).format(getFormatByValue(activeTypeValue))])
        }
      ]
    });
    //eslint-disable-next-line
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
  timelineFilter: PropTypes.string.isRequired
};
AreaChart.defaultProps = { data: [] };

export default AreaChart;
