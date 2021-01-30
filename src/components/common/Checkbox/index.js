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
  checkmarkColor,
  disabled,
  ...props
}) => {
  const style = { backgroundColor, borderColor, '--checkmark-color': checkmarkColor };
  const _onClick = () => {
    if (disabled)
      return;
    else
      onClick();


  };


  return (
    <FlexBox onClick={_onClick} className={clx('checkbox-container', className, { active })} {...props}>
      <input type='checkbox' checked={active} disabled={disabled} />
      <span className='checkmark' style={style} />
    </FlexBox>
  );
};

CheckBox.propTypes = {};
CheckBox.defaultProps = { checkmarkColor: '#fff' };

export default CheckBox;
