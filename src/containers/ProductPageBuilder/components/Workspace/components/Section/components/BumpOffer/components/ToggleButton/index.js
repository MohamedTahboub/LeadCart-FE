import React from 'react';
import clx from 'classnames';
import colorProps from 'color';


import common from 'components/common';

import './style.css';

const { LayoutSwitch, CustomReactToggle, CustomRadio, CustomCheckbox } = common;


const isTransparent = (color) => colorProps(color)?.ansi256()?.object()?.alpha === 0;


const ToggleButton = ({ toggleInput = 'checkbox', toggleClassName, isChecked, headerTextColor, headerBackground, containerBackground, columnBg, productBg, sectionBg, ...props }) => {
  const getActiveMarkColor = () => {
    if (Boolean(headerBackground) && !isTransparent(headerBackground))
      return headerBackground;
    if (Boolean(containerBackground) && !isTransparent(containerBackground))
      return containerBackground;
    else if (Boolean(columnBg) && !isTransparent(columnBg))
      return columnBg;
    else if (Boolean(sectionBg) && !isTransparent(sectionBg))
      return sectionBg;
    else if (Boolean(productBg) && !isTransparent(productBg))
      return productBg;
    else
      return '#fff';
  };


  const activeMarkColor = getActiveMarkColor();
  const toggleInputActive = toggleInput === 'classic' ? 'checkbox' : toggleInput === 'modern' ? 'toggle' : toggleInput;

  return (
    <LayoutSwitch className='bump-offer-toggle-button flex-box v-center h-center' active={toggleInputActive} >
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
