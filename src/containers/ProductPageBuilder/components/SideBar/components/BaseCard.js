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

  return (
    <div className={classNames} {...props} />
  );
};

ElementCard.propTypes = {

};

export default ElementCard;
