import React from 'react';
import common from 'components/common';
import { DropZoneSpace } from '.';
import { stylesCasting } from './helpers';

const { FlexBox } = common;


export default ({ sections, styles, ...props }) => {

  const { firstColumn: firstColumnStyles = { }, secondColumn: secondColumnStyles = { } } = styles;


  const passedProps = {
    sections,
    ...props
  };

  const firstColumnCastedStyles = stylesCasting(firstColumnStyles);
  const secondColumnCastedStyles = stylesCasting(secondColumnStyles);

  return (
    <FlexBox>
      <FlexBox flex style={firstColumnCastedStyles}>
        <DropZoneSpace {...passedProps} parentZone='first-column' style={{ width: 450 }} />
      </FlexBox>
      <FlexBox flex style={secondColumnCastedStyles}>
        <DropZoneSpace {...passedProps} parentZone='second-column' style={{ width: 450 }}/>
      </FlexBox>
    </FlexBox>
  );
};
