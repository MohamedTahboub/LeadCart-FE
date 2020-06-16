import React, { useState } from 'react';
import ids from 'shortid';

const ActivationSwitchInput = ({
  active,
  note,
  className = 'activability-switch',
  onToggle,
  ...props
}) => {
  const [id] = useState(ids.generate());
  return (
    <div className='activations-switch-input'>
      <label htmlFor={id} className={`custom-switch-input ${className}`}>
        <input id={id} type='checkbox' onChange={onToggle} checked={active} />
        <span className='slider-input slider-round' />
      </label>
      {note && <span className='input-note switch-activations'>{note}</span>}
    </div>
  );
};

export default ActivationSwitchInput;
