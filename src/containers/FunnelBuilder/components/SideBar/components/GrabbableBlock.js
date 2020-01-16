import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { ReactComponent as GrabMeIcon } from 'assets/images/icons/grapme.svg';


const {
  Title,
  FlexBox
} = common;

const GrabbableBlock = ({
  demoImage,
  title,
  description,
  onDragStart,
  ...props
}) => {
  const elementRef = useRef(null);
  return (
    <FlexBox
      center='v-center'
      className='item-grabbable margin-v-10'
      ref={elementRef}
      onDragStart={(e) => onDragStart(elementRef, e)}
      {...props}
    >
      <FlexBox flexStart>
        <GrabMeIcon />
      </FlexBox>
      <FlexBox flexStart>
        <img src={demoImage} alt='grab icon' className='grabbable-demo-image' />
      </FlexBox>
      <FlexBox column>
        <h5 className='bold-text darkgray-color'>{title}</h5>
        <p className='small-text gray-color'>{description}</p>
      </FlexBox>
    </FlexBox>
  );
};

GrabbableBlock.propTypes = {

};

export default GrabbableBlock;
