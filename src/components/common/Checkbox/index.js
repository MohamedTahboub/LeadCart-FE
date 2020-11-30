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
  ...props
}) => {
  const style = { backgroundColor, borderColor, '--checkmark-color': checkmarkColor };

  return (
    <FlexBox onClick={onClick} className={clx('checkbox-container', className, { active })} {...props}>
      <input type='checkbox' checked={active} />
      <span className='checkmark' style={style} />
    </FlexBox>
  );
};

CheckBox.propTypes = {};
CheckBox.defaultProps = { checkmarkColor: '#fff' };

export default CheckBox;
