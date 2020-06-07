import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { ReactComponent as GrabMeIcon } from 'assets/images/icons/grapme.svg';
import clx from 'classnames';

const { FlexBox } = common;

const GrabbableBlock = ({
  demoImage,
  title,
  disabled,
  description,
  onDragStart,
  data,
  className,
  ...props
}) => {
  const elementRef = useRef(null);

  const onDrag = (event) => {
    onDragStart({
      data,
      event,
      ref: elementRef,
      demoImage
    });
  };

  const classNames = clx('my-3', disabled ? 'item-disabled' : 'item-grabbable', className);

  return (
    <FlexBox
      center='v-center'
      className={classNames}
      onDragStart={onDrag}
      draggable
      {...props}
      elementRef={elementRef}
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
  demoImage: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  description: PropTypes.string,
  onDragStart: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.object),
  className: PropTypes.string
};

export default GrabbableBlock;
