import React from 'react';
import clx from 'classnames';

import common from 'components/common';
import CheckBox from 'components/common/Checkbox';

import './style.css';

const { LayoutSwitch, InputRow } = common;
const { Toggle, Radio } = InputRow;


const ToggleButton = ({ toggleInput = 'toggle', toggleClassName, isChecked, headerTextColor, headerBackground, ...props }) => {


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
        borderColor={headerTextColor}
        backgroundColor='transparent'
      />

      <CheckBox
        {...props}
        id='checkbox-circle'
        className={clx('checkbox-circle', toggleClassName)}
        active={isChecked}
        borderColor={headerTextColor}
        backgroundColor='transparent'
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
