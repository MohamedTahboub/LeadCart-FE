import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';
import { isFunction } from 'libs/checks';

const ResizableInput = ({ style, ...props }) => {
  const [value, setValue] = useState(props.value);


  useEffect(() => {
    setValue(props.value);
    return () => {
      setValue('');
    };
  }, [props.value]);

  const onChange = ({ target: { value } }) => {
    console.log('Value', value);
    setValue(value);
  };
  const onBlue = (e) => {
    if (isFunction(props.onBlue)) return props.onBlue(e);

    if (isFunction(props.onChange)) return props.onChange(e);
  };

  return (
    <AutosizeInput
      {...props}
      className='transparent-background'
      inputStyle={style}
      onChange={onChange}
      onBlue={onBlue}
      value={value}
    />
  );
};

ResizableInput.propTypes = {
  style: PropTypes.objectOf(PropTypes.object)
};
ResizableInput.defaultProps = {
  style: {
    border: 'none',
    outlineStyle: 'none',
    background: 'transparent'
  }
};

export default ResizableInput;
