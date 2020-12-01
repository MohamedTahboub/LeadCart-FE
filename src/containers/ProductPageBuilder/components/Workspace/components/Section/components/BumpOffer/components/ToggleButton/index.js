import React from 'react';
import clx from 'classnames';
import Toggle from 'react-toggle';


import common from 'components/common';
import CheckBox from 'components/common/Checkbox';
import CustomRadio from '../CustomRadio';

import './style.css';

const { LayoutSwitch } = common;


const ToggleButton = ({ toggleInput = 'checkbox', toggleClassName, isChecked, headerTextColor, headerBackground, containerBackground, ...props }) => {
  const activeMarkColor = (headerBackground && headerBackground !== 'transparent') ? headerBackground : containerBackground;
  const styleVars = { '--header-text-color': headerTextColor, '--active-mark-color': activeMarkColor };


  React.useEffect(() => {
    const toggleElements = document.querySelectorAll('.bump-offer-toggle-button  .react-toggle--checked .react-toggle-track');

    [...toggleElements].forEach(({ style = {} }) => {
      style.backgroundColor = headerTextColor;
    });
  }, [headerTextColor]);


  return (
    <LayoutSwitch className='bump-offer-toggle-button flex-box v-center h-center' active={toggleInput} >
      <Toggle
        id='toggle'
        checked={isChecked}
        className={`${toggleClassName} ${headerTextColor} mr-2`}
        style={styleVars}
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
