import React, { useState } from 'react';
import { SelectBox } from '../Inputs'

import './style.css';

export const DisableEnableWrapper = ({
  enabled: init = false,
  id: featureId,
  children,
  className,
  onEnabled,
  onDisabled
}) => {

  const [enabled, setEnable] = useState(init)

  const onToggle = () => {
    setEnable(!enabled)
    if (!enabled)
      onEnabled(featureId)
    else
      onDisabled(featureId)
  }

  return (
    <div className={`disable-enable-wrapper ${className}`}>
      <div className='wrapper-check-input'>
        <SelectBox
          onChange={onToggle}
          checked={enabled}
        />
      </div>
      <div className={`wrapper-contained-element ${!enabled ? 'disabled' : ''}`}>
        {children}
      </div>
    </div>
  )
}
