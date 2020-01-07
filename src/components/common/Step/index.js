import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';

import './style.css';

const Step = ({
  className,
  value,
  id,
  children
}) => {
  const classNames = clx({
    className,
    active: value === id
  });

  return (
    <div className={`step-container ${classNames}`}>
      {id && <span className='step-val'>{id}</span>}
      <span className='step-content'>{children}</span>
    </div>
  );
};

Step.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  id: PropTypes.oneOf([PropTypes.string, PropTypes.number])
};
Step.defaultProps = {
  className: '',
  id: 1
};

export default Step;
