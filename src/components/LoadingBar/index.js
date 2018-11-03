import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.css';


class LoadingBar extends Component {
  render () {
    return this.props.isLoading
      ? (
        <div className='application-loading-bar'>
          <div className='lodaing-progress' />
        </div>
      )
      : null;
  }
}

const mapStateToProps = ({ loading }) => ({ isLoading: loading });

export default connect(mapStateToProps)(LoadingBar);
