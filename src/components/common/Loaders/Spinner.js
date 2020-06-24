import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';


const Spinner = ({ show, size, color, className }) => {
  if (!show) return null;

  const classNames = clx('spinner-component spinner', size, className);

  const styles = { '--spinner-color': color };
  return (
    <span style={styles} className={classNames} data-color={color} />
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'normal', 'large', 'x-large'])
};
Spinner.defaultProps = {
  className: '',
  show: false,
  size: 'normal',
  color: 'rgb(177, 176, 176)'
};
export default Spinner;
