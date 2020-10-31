import React from 'react';
import common from 'components/common';
import { DropZoneSpace } from '.';
import { stylesCasting } from './helpers';

const { FlexBox } = common;


export default ({ sections, styles, ...props }) => {

  const { firstColumn: firstColumnStyles = {}, secondColumn: secondColumnStyles = {} } = styles;


  const passedProps = {
    sections,
    ...props
  };

  const firstColumnCastedStyles = stylesCasting(firstColumnStyles);
  const secondColumnCastedStyles = stylesCasting(secondColumnStyles);

  if (!firstColumnCastedStyles.width)
    firstColumnCastedStyles.width = '450px';
  if (!secondColumnCastedStyles.width)
    secondColumnCastedStyles.width = '450px';

  return (
    <FlexBox wrappable>
      <FlexBox className='product-column' style={firstColumnCastedStyles}>
        <DropZoneSpace {...passedProps} parentZone='first-column' />
      </FlexBox>
      <FlexBox className='product-column' style={secondColumnCastedStyles}>
        <DropZoneSpace {...passedProps} parentZone='second-column' />
      </FlexBox>
    </FlexBox>
  );
};
