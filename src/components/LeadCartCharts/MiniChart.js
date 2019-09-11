import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-mini-chart';

const MiniChart = (props) => (
  <Chart
    strokeColor='#4DA1FF'
    activePointColor='rgb(32, 47, 88)'
    activePointRadius={4}
    strokeWidth={1}
    labelFontSize={10}
    width={80}
    height={20}
    dataSet={[0, -20, 343, 49.3, -100, 200, 78]}
  />
);

MiniChart.propTypes = {

};

export default MiniChart;
