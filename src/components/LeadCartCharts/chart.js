import React, { Component } from 'react';
import Highcharts from 'react-highcharts';
import sampleData from 'data/chart.json';
import './style.css';

const data = sampleData.map((r) => ([r[0] / 100000000000 - 7, r[1] * 100000]));

export default class Charts extends Component {
    state = {
      config: {
        chart: {
          renderTo: 'container'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          type: 'datetime',

        },
        yAxis: {
          title: {
            text: this.props.Ytext
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          type: this.props.seriesType,
          name: this.props.seriesName,
          data
        }]
      }
    }

    render () {
      return (
        <div id='container' className='chart-body' style={{ margin: '15px auto', width: '100%' }}>
          <Highcharts config={this.state.config} />
        </div>
      );
    }
}
