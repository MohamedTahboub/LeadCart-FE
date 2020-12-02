import React from 'react';
import clx from 'classnames';


import common from 'components/common';

import './style.css';

const { LayoutSwitch, CustomReactToggle, CustomRadio, CustomCheckbox } = common;


const ToggleButton = ({ toggleInput = 'checkbox', toggleClassName, isChecked, headerTextColor, headerBackground, containerBackground, ...props }) => {
  const activeMarkColor = (headerBackground && headerBackground !== 'transparent') ? headerBackground : containerBackground;

  return (
    <LayoutSwitch className='bump-offer-toggle-button flex-box v-center h-center' active={toggleInput} >
      <CustomReactToggle
        id='toggle'
        checked={isChecked}
        className={`${toggleClassName} ${headerTextColor} mr-2`}
        checkmarkColor={activeMarkColor}
        backgroundColor={headerTextColor}
      />

      <CustomCheckbox
        {...props}
        id='checkbox'
        active={isChecked}
        className={toggleClassName}
        borderColor={headerTextColor}
        backgroundColor={isChecked ? headerTextColor : 'transparent'}
        checkmarkColor={activeMarkColor}
      />

      <CustomCheckbox
        {...props}
        id='checkbox-circle'
        className={clx('checkbox-circle', toggleClassName)}
        active={isChecked}
        borderColor={headerTextColor}
        backgroundColor={isChecked ? headerTextColor : 'transparent'}
        checkmarkColor={activeMarkColor}
      />

      <CustomRadio
        id='radio'
        checked={isChecked}
        className={`${toggleClassName} mr-2`}
        borderColor={headerTextColor}
        checkmarkColor={headerTextColor}
      />
    </LayoutSwitch>
  );
};

export default ToggleButton;
