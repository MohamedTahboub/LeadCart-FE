import React, { useEffect, useState } from 'react';
import clx from 'classnames';

import common from 'components/common';
import './textareStyle.css';

const { FlexBox } = common;

const Title = ({ className, children, style }) => <p style={style} className={clx(`m-0 ${className}`)} >{children}</p>;


const TextAreaInput = ({
  placeholder,
  error: passedError,
  value: defaultValue,
  countable = false,
  cols,
  rows,
  maxLength,
  readonly,
  labelStyle,
  labelClassName,
  onBlur,
  disabled,
  className,
  wordName = 'letters',
  label,
  column = false,
  onChange,
  name,
  resizable = false,
  resizableX = false,
  resizableY = false,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue);
  const [errorMessage, setErrorMessage] = useState(passedError);

  useEffect(() => {
    setValue(defaultValue);
    setErrorMessage(passedError);
  }, [defaultValue, passedError]);


  const _onChange = ({ target: { name, value } }) => {
    if (typeof onChange === 'function')
      onChange({ target: { name, value } });

    setValue(value);
  };

  const containerClasses = clx(`text-area-container ${className}`);
  const labelClasses = clx('labelClassName m-0', { 'mb-2': column, 'mr-2': !column, labelClassName });
  const textAreaClasses = clx('text-area-field', { 'ml-2': (column && label) });

  const getResizable = () => {
    if (resizable)
      return { resize:  'both' };
    if (resizableX)
      return { resize: 'horizontal' };
    if (resizableY)
      return { resize: 'vertical' };
    else
      return { resize: 'none' };
  };


  return (
    <FlexBox className={containerClasses} column {...props}>
      <FlexBox column={column} flex>
        {label && <Title style={labelStyle} className={labelClasses}>{label}</Title>}
        <FlexBox column flex>
          <textarea
            placeholder={placeholder}
            onChange={_onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            disabled={disabled}
            cols={cols}
            rows={rows}
            maxLength={maxLength}
            readOnly={readonly}
            className={textAreaClasses}
            style={getResizable()}
          />
          {countable && <Title className={clx('note-text mt-1', { 'ml-2': column })} >{`${value?.length} ${wordName}`}</Title>}
        </FlexBox>
      </FlexBox>
      {errorMessage && <Title className='error-text mt-2 text-center' >{errorMessage}</Title>}
    </FlexBox>
  );

};
export default TextAreaInput;

