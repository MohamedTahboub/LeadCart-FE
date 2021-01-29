import React from 'react';
import clx from 'classnames';

import common from 'components/common';

import './style.css';
import { isFunction } from 'libs/checks';

const { FlexBox, Title, Spinners, Tooltip } = common;
const { BeatLoader } = Spinners;
const FontDemoCard = ({ font = {}, onClick, children, active, disabled, clickable, loading }) => {
  const { family } = font;


  const boxContainerClasses = clx('m-1 h-center p-2 px-3 font-demo-card', {
    active,
    disabled,
    'item-clickable': clickable
  });

  const _onClick = (e) => {
    if (isFunction(onClick) && !disabled) onClick(font, e);
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
        {loading && (
          <FlexBox flex flexEnd>
            <Tooltip text='loading the font' placement='top'>
              <BeatLoader size={8} color='gray' />
            </Tooltip>
          </FlexBox>
        )}
      </FlexBox>

      <FlexBox flex className='m-2 large-text' style={{ 'font-family': family }}>
        This text for display the result for this font with the selected variant
      </FlexBox>
      {children}
    </FlexBox>
  );
};

export default FontDemoCard;
