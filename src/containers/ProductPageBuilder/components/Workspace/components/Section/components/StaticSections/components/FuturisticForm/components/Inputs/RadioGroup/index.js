import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import './style.css';
import clx from 'classnames';


const { FlexBox, InputRow } = common;
const { Radio } = InputRow;
const { Group } = Radio;


const RadioGroup = ({ options, onChange, name, optionClassName, value, className, ...props }) => {
  const classes = clx('input-radio', className);

  return (
    <Group onChange={onChange} value={value} name={name} className={classes}>
      {options.map(({ label, value, ...props }) => (
        <Radio
          key={value}
          value={value}
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
