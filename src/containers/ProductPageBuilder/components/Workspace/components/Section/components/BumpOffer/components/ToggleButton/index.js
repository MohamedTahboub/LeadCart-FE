import React from 'react';
import clx from 'classnames';

import common from 'components/common';
import CheckBox from 'components/common/Checkbox';

import './style.css';

const { LayoutSwitch, InputRow } = common;
const { Toggle, Radio } = InputRow;


const ToggleButton = ({ toggleInput = 'toggle', toggleClassName, isChecked, ...props }) => {
  return (
    <LayoutSwitch active={toggleInput} >
      <Toggle
        {...props}
        id='toggle'
        value={isChecked}
        className={toggleClassName}
      />

      <CheckBox
        {...props}
        id='checkbox'
        active={isChecked}
        className={toggleClassName}
      />

      <CheckBox
        {...props}
        id='checbox-circle'
        className={clx('checbox-circle', toggleClassName)}
        active={isChecked}
      />

      <Radio
        type='radio'
        id='radio'
        checked={isChecked}
        className={toggleClassName}
      />
    </LayoutSwitch>
  );
};

export default ToggleButton;
