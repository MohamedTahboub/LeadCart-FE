import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import './style.css';
import clx from 'classnames';


const { InputRow } = common;
const { Radio } = InputRow;
const { Group } = Radio;


const RadioGroup = ({ options, onChange, optionClassName, value, className }) => {
  const classes = clx('input-radio', className);

  const _onChange = ({ target: { value } }) => {
    onChange && onChange(value);
  };

  return (
    <Group onChange={_onChange} value={value} className={classes}>
      {options.map(({ label, value, name, ...props }) => (
        <Radio
          key={value}
          value={name}
          {...props}
          className={clx(props.className, optionClassName)}
        >{label}</Radio>
      ))}
    </Group>
  );
};
RadioGroup.propTypes = { options: PropTypes.arrayOf(PropTypes.objectOf({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired })) };
RadioGroup.defaultProps = { options: [] };
export default RadioGroup;
