import React, { useRef } from 'react';

import './style.css';

export default ({
  type = 'text',
  error,
  name,
  onChange,
  placeholder,
  label = 'Label',
  className = '',
  tabIndex
}) => {
  const inputPlaceholder = useRef(null);
  const inputField = useRef(null);
  const inputLabel = useRef(null);
  
  const boxFocus = () => {
    inputField.current.focus();
  }

  const inputFocus = () => {
    if (inputField.current.value == "") {
      inputLabel.current.style.transform = "translate(0, 0) scale(1)";
      inputLabel.current.style.top = "0px";
      inputLabel.current.style.cursor = "pointer";
      inputPlaceholder.current.style.display = "block";
      window.setTimeout(function () {
        inputPlaceholder.current.style.opacity = "1";
      }, parseFloat(window.getComputedStyle(inputPlaceholder.current).transitionDuration) * 1000);
    }
  }

  const inputBlur = () => {
    if (inputField.current.value == "") {
      inputPlaceholder.current.style.opacity = "0";
      window.setTimeout(function () {
        if (document.activeElement !== inputField.current) {
          inputPlaceholder.current.style.display = "";
          inputLabel.current.style.transform = "";
          inputLabel.current.style.top = "";
          inputLabel.current.style.cursor = "";
        }
      }, parseFloat(window.getComputedStyle(inputPlaceholder.current).transitionDuration) * 1000);
    }
  }

  return(
    <div className={`custom-input-field ${className}`} tabIndex={0} onFocus={boxFocus}>
      {error && <span className='input-feild-error'>{error}</span>}
      <input
        type={type}
        name={name}
        onChange={(event) => onChange(event, inputPlaceholder)}
        id={name}
        onFocus={inputFocus}
        onBlur={inputBlur}
        ref={inputField}
      />
      <label ref={inputLabel} htmlFor={name}>{label}</label>
      <div className="input-placeholder" ref={inputPlaceholder}>{placeholder}</div>
    </div>
  );
}