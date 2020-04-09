import React from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';

const AnimatedProgressBar = ({
  children,
  ...props
}) => (
  <ProgressBar
    className='animated'
    {...props}
  >
    {children}
  </ProgressBar>
);

AnimatedProgressBar.propTypes = {

};

export default AnimatedProgressBar;
