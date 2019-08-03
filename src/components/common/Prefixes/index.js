import React from 'react';
import { getCurrencySymbol } from 'libs';

import './style.css';

export const Currency = ({ value, className = '', ...props }) => (
  <div className={`currency-label ${className}`}>
    {getCurrencySymbol(value)}
  </div>
);
