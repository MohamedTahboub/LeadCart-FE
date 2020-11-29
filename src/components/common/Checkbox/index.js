import React from 'react';
import clx from 'classnames';

import { FlexBox } from '../boxes';
import './style.css';


const CheckBox = ({
  className,
  active,
  onClick,
  backgroundColor,
  borderColor,
  ...props
}) => {
  return (
    <FlexBox onClick={onClick} className={clx('checkbox-container', className, { active })} {...props}>
      <input type='checkbox' checked={active} />
      <span className='checkmark' style={{ backgroundColor, borderColor }} />
    </FlexBox>
  );
};

CheckBox.propTypes = {};
CheckBox.defaultProps = {};

export default CheckBox;
