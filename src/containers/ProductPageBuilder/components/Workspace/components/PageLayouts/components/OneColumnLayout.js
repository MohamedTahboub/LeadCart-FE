import React from 'react';
import common from 'components/common';
import { DropZoneSpace } from '.';
import { stylesCasting } from './helpers';
const { FlexBox } = common;

export default ({ styles, layout, ...props }) => {
  const { firstColumn: columnStyles = {} } = styles;

  if (layout === 'one-column' && !columnStyles.width)
    columnStyles.width = '750px';


  const castedStyles = stylesCasting(columnStyles);
  return (
    <FlexBox className='product-column' style={castedStyles}>
      <DropZoneSpace {...props} parentZone='first-column' />
    </FlexBox>
  );
};
