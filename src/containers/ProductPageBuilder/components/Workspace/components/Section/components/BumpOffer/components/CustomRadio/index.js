import React from 'react';
import clx from 'classnames';


import './style.css';

const Radio = ({ borderColor = '#4da1ff', backgroundColor = '#fff', checkmarkColor = '#4da1ff', name, checked, className, style, ...props }) => {
  const styleWithVars = { borderColor, backgroundColor, '--radio-checkmark-color': checkmarkColor };


  return (
    <div className={clx(`custom-radio-container ${className}`, { active: checked })} style={{ ...style, ...styleWithVars }} {...props}>
      <input className='custom-radio-input' type='radio' name={name} checked={checked} />
      <div className='custom-radio-checkmark' type='radio' />
    </div>
  );
};

export default Radio;
