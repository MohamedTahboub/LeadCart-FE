import React, { useState } from 'react';
import ids from 'shortid';
import Toggle from 'react-toggle';
import './style.css';

const ActivationSwitchInput = ({
  active,
  note,
  className = 'activability-switch',
  onToggle
}) => {
  const [id] = useState(ids.generate());
  return (
    <div className='activations-switch-input'>
      <label htmlFor={id} className={`custom-switch-input ${className}`}>
        <Toggle className='lc-toggle' defaultChecked onChange={onToggle} value={active ? 'no' : 'yes'}
          icons={{ checked: null, unchecked: null }}
        />
        <span className='slider-input slider-round' />
      </label>
      {note && <span className='input-note switch-activations'>{note}</span>}
    </div>
  );
};

export default ActivationSwitchInput;
