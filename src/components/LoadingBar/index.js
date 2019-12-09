import React from 'react';
import { connect } from 'react-redux';

import './style.css';


const LoadingBar = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className='application-loading-bar'>
      <div className='lodaing-progress' />
    </div>
  );
};

const mapStateToProps = ({ loading }) => ({ loading });

export default connect(mapStateToProps)(LoadingBar);
