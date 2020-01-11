
import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Feature = ({ plus , children, ...props }) => (
  <div
    className={`feature-item ${plus ? 'plus' : ''}`}
  >
    {children}
  </div>
);

Feature.propTypes = {

};

export default Feature;
