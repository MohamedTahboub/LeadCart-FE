import React from 'react';
import clx from 'classnames';

import common from 'components/common';
import Toggle from '../ToggleButton';

import './style.css';

const { FlexBox, ResizableTextarea } = common;

const MainTitle = ({
  headerBackground,
  headerTextColor,
  toggleInput,
  borderRadius,
  borderBottomColor,
  borderBottomStyle,
  borderBottomWidth,
  containerBackground,
  title,
  isChecked,
  className,
  onChange,
  columnBg,
  productBg,
  sectionBg
}) => {
  const toggleProps = { toggleInput, isChecked, headerTextColor, headerBackground, containerBackground, columnBg, productBg, sectionBg };
  const headerStyle = { backgroundColor: headerBackground, borderRadius: borderBottomWidth ? 0 : `${borderRadius}px`, borderBottomWidth: `${borderBottomWidth}px`, borderBottomColor, borderBottomStyle };

  return (
    <FlexBox className={clx(`v-center bump-offer-title-container ${className}`)} style={headerStyle} >
      <Toggle {...toggleProps} />

      <ResizableTextarea
        className='bump-offer-title-text flex-1 bold-text'
        style={{ color: headerTextColor }}
        name='content.title'
        value={title}
        onChange={onChange}
      />
    </FlexBox>
  );
};

export default MainTitle;
