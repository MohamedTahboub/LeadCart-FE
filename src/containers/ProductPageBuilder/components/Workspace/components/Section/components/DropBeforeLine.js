import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';

const DropBeforeLine = ({
  className,
  show
}) => {
  const classes = clx({
    [className]: className,
    'drop-before-line': true,
    show
  });
  return (
    <div className={classes} />
  );
};

DropBeforeLine.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
};
DropBeforeLine.defaultProps = {
  className: '',
  show: false,
};

export default DropBeforeLine;
