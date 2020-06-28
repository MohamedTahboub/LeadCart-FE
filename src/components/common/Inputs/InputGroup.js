import React from 'react';
import clx from 'classnames';

import TextField from './TextField';

const InputGroup = (props) => {
  const {
    error,
    label,
    className,
    ...rest
  } = props;

  const classNames = clx({
    [className]: className,
    error
  });
  return (
    <div className={`input-group ${classNames}`} error-data={error}>
      <TextField {...rest} uncontrolled />
      {label && <span className='group-label'>{label}</span>}
    </div>
  );
};

export default InputGroup;
