import React from 'react'
import common from 'components/common';
import { DropZoneSpace } from '.'

const {
  FlexBox
} = common;

export default (props) => {

  return (
    <FlexBox>
      <FlexBox flex>
        <DropZoneSpace {...props}  parentZone='first-column' />
      </FlexBox>
      <FlexBox flex>
        <DropZoneSpace {...props} parentZone='second-column' />
      </FlexBox>
    </FlexBox>
  )
}