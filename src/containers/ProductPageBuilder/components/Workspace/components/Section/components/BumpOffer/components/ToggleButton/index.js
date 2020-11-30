import React from 'react';
import clx from 'classnames';

import common from 'components/common';
import CheckBox from 'components/common/Checkbox';

import './style.css';

const { LayoutSwitch, InputRow } = common;
const { Toggle, Radio } = InputRow;


const ToggleButton = ({ toggleInput = 'toggle', toggleClassName, isChecked, headerTextColor, headerBackground, containerBackground, ...props }) => {

  const styleVars = { '--header-text-color': headerTextColor, '--container-bg-color': containerBackground };


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
        checkmarkColor={headerBackground !== 'transparent' ? headerBackground : containerBackground}
      />

      <CheckBox
        {...props}
        id='checkbox-circle'
        className={clx('checkbox-circle', toggleClassName)}
        active={isChecked}
        borderColor={headerTextColor}
        backgroundColor={isChecked ? headerTextColor : 'transparent'}
        checkmarkColor={headerBackground !== 'transparent' ? headerBackground : containerBackground}
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
