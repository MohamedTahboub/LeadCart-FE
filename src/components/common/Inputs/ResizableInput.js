import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';
import { isFunction } from 'libs/checks';
import clx from 'classnames';

const ResizableInput = ({
  style,
  defaultValue,
  className,
  ...props
}) => {
  const [value, setValue] = useState(props.value || defaultValue);
  useEffect(() => {
    setValue(props.value);
    return () => {
      setValue('');
    };
  }, [props.value]);

  const onChange = ({ target: { value } }) => {
    if ((value && !value.trim()) || !value) return setValue(defaultValue);

    setValue(value);
  };
  const onBlur = (e) => {
    if (isFunction(props.onBlur)) return props.onBlue(e);
    if (isFunction(props.onChange)) return props.onChange(e);
  };

  const classNames = clx({
    'transparent-background': true,
    [className]: className
  });
  const styles = {
    border: 'none',
    outlineStyle: 'none',
    background: 'transparent',
    maxWidth: '100%',
    ...style
  };
  return (
    <AutosizeInput
      {...props}
      className={classNames}
      inputStyle={styles}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  );
};

ResizableInput.propTypes = { style: PropTypes.objectOf(PropTypes.object) };
ResizableInput.defaultProps = {
  style: {
    border: 'none',
    outlineStyle: 'none',
    background: 'transparent'
  }
};

export default ResizableInput;
