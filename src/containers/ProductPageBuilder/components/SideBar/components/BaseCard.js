import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';


const ElementCard = ({
  className,
  ...props
}) => {
  const classNames = clx({
    'base-element-card': true,
    [className]: className
  });
  const onDragStart = (e) => {
    e.dataTransfer.setData('section-item', props.type);
  };

  return (
    <div
      className={classNames}
      {...props}
      onDragStart={onDragStart}
    />
  );
};

ElementCard.propTypes = {

};

export default ElementCard;
