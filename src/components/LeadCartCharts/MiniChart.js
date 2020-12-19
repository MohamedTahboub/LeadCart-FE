import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-mini-chart';

const MiniChart = ({ data = [] }) => {
  const dataSet = [0, 0, ...data.map((d) => d[1])];
  return (
    <Chart
      strokeColor='#4DA1FF'
      activePointColor='rgb(32, 47, 88)'
      activePointRadius={4}
      strokeWidth={1}
      labelFontSize={10}
      width={80}
      height={20}
      dataSet={dataSet}
    />
  );
};

MiniChart.propTypes = { data: PropTypes.arrayOf(PropTypes.array).isRequired };

MiniChart.defaultValue = { data: [] };

export default MiniChart;
