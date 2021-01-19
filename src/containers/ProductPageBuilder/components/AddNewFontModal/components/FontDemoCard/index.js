import React from 'react';
import clx from 'classnames';

import common from 'components/common';

import './style.css';
import { isFunction } from 'libs/checks';

const { FlexBox, Title } = common;
const FontDemoCard = ({ font = {}, onClick, children, active, disabled, clickable }) => {
  const { family } = font;


  const boxContainerClasses = clx('m-2 h-center px-3 font-demo-card', {
    active,
    disabled,
    'item-clickable': clickable
  });

  const _onClick = (e) => {
    if (isFunction(onClick)) onClick(font, e);
  };

  return (
    <FlexBox
      onClick={_onClick}
      className={boxContainerClasses}
      column
    >
      <FlexBox className='v-center py-2' >
        <Title className='m-0 truncate flex-1' >
          {family}
        </Title>
      </FlexBox>

      <FlexBox flex className='m-2 large-text' style={{ 'font-family': family }}>
        This text for display the result for this font with the selected variant
      </FlexBox>
      {children}
    </FlexBox>
  );
};

export default FontDemoCard;
