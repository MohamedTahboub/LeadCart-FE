import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.css';

const StarsRanking = ({
  color = '#fac917',
  max = 5,
  name,
  rank,
  onChange,
  ...props
}) => {
  const onUpdate = (rank) => {
    onChange({
      target: {
        name,
        value: rank
      }
    });
  };
  const onIncrement = () => {
    if (rank < max) onUpdate(rank + 1);
    else onUpdate(0);
  };

  return (
    <span className='stars-icons'>
      {
        new Array(max).fill().map((i, index) => (
          <i
            className='fas fa-star'
            onClick={onIncrement}
            style={{
              color: (index + 1) <= rank ? color : '#ABB8C3'
            }}
            role='presentation'
          />
        ))
      }
    </span>
  );
};

StarsRanking.propTypes = {

};

export default StarsRanking;
