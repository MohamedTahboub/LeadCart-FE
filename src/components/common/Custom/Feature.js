
import React from 'react';

import './style.css';

const Feature = ({ plus, children, ...props }) => (
  <div
    className={`feature-item ${plus ? 'plus' : ''}`}
  >
    {children}
  </div>
);

export default Feature;
