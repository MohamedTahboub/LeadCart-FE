import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
// const { Handle } = Slider;

export default ({
  name,
  onChange,
  min,
  max,
  ...props
}) => {
  const onInputChange = (value) => {
    onChange({
      target: {
        name,
        value
      }
    });
  };
  return (
    <InputRange
      minValue={min}
      maxValue={max}
      onChange={onInputChange}
    />
  );
};
