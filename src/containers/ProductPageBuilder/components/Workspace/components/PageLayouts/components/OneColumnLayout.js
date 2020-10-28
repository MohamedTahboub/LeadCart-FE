import React from 'react';
import common from 'components/common';
import { DropZoneSpace } from '.';
import { stylesCasting } from './helpers';
const { FlexBox } = common;

export default ({ styles, ...props }) => {
  const { firstColumn: columnStyles = {} } = styles;

  const castedStyles = stylesCasting(columnStyles);
  return (
    <FlexBox flex style={castedStyles}>
      <DropZoneSpace {...props} parentZone='first-column' style={{ width: 750 }}/>
    </FlexBox>
  );
};
