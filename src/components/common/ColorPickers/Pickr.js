import React, { useState } from 'react';
import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/nano.min.css';

import { data } from './helpers';

const MiniTwitterPicker = ({ value, onChange, name }) => {
  // const [color, setColor] = useState(value);
  const [defaultColor] = useState(value);


  let picker;
  React.useEffect(() => {
    try {
      picker = Pickr.create(data(value))
        .on('change', onPickrChange)
        .on('save', OnReset);
      // .on('cancel', onCancel);
    } catch (err) {
      console.log(err.message);
    }

  }, []);

  const onColorChange = (value) => {
    onChange({
      target: {
        name,
        value: value.toString()
      }
    });
  };


  const onPickrChange = (color) => {
    onColorChange(color.toHEXA());
    // setColor(color.toHEXA());
  };

  const OnReset = () => {
    onColorChange(defaultColor);
    picker.hide();
    // setColor(defaultColor);
  };

  // const onCancel = () => {
  //   onColorChange(color);
  //   picker.hide();
  // };

  return <div className='color-picker' />;
};

export default MiniTwitterPicker;
