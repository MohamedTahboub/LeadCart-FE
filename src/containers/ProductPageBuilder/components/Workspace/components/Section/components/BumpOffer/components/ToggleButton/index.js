import React from 'react';
import clx from 'classnames';

import common from 'components/common';
import CheckBox from 'components/common/Checkbox';

import './style.css';

const { LayoutSwitch, InputRow } = common;
const { Toggle, Radio } = InputRow;


const ToggleButton = ({ toggleInput = 'toggle', toggleClassName, isChecked, headerTextColor, headerBackground, containerBackground, ...props }) => {
  const activeMarkColor = (headerBackground && headerBackground !== 'transparent') ? headerBackground : containerBackground;
  const styleVars = { '--header-text-color': headerTextColor, '--active-mark-color': activeMarkColor };


  return (
    <LayoutSwitch className='bump-offer-toggle-button' active={toggleInput} >
      <Toggle
        id='toggle'
        value={isChecked}
        className={toggleClassName}
        style={styleVars}
        beforeLabel=''
        afterLabel=''
      />

      <CheckBox
        {...props}
        id='checkbox'
        active={isChecked}
        className={toggleClassName}
        borderColor={headerTextColor}
        backgroundColor={isChecked ? headerTextColor : 'transparent'}
        checkmarkColor={activeMarkColor}
      />

      <CheckBox
        {...props}
        id='checkbox-circle'
        className={clx('checkbox-circle', toggleClassName)}
        active={isChecked}
        borderColor={headerTextColor}
        backgroundColor={isChecked ? headerTextColor : 'transparent'}
        checkmarkColor={activeMarkColor}
      />

      <Radio
        type='radio'
        id='radio'
        checked={isChecked}
        className={toggleClassName}
        style={styleVars}

      />
    </LayoutSwitch>
  );
};

export default ToggleButton;
