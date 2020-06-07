import React, { useState } from 'react';
import { TwitterPicker } from 'react-color';
import './style.css';

export { TwitterPicker };
export const MiniTwitterPicker = ({
  value,
  onChange,
  name
}) => {
  const [show, setShow] = useState(false);
  const onColorChange = (color = {}) => {
    const { hex } = color;
    onChange({
      target: {
        name,
        value: hex
      }
    });
    setShow(false);
  };

  const style = { background: value };
  return (
    <div className='color-picker-modal'>
      <div
        onClick={() => setShow(!show)}
        style={style}
        className='color-presentation-holder'
        role='presentation'
      />
      {show && (
        <div className='twitter-picker-holder'>
          <TwitterPicker
            width='210px'
            triangle='top-right'
            color={value}
            onChange={onColorChange}
          />
        </div>
      )}
    </div>
  );
};

