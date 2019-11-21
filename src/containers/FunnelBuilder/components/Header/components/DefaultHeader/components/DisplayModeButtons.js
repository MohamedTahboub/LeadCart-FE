import React from 'react';
import PropTypes from 'prop-types';

const DisplayModeButtons = ({ onChange, type }) => {
  const Icon = ({
    type,
    onChange,
    iconClassName,
    activeType
  }) => (
    <i
      onClick={() => onChange(type)}
      className={`fas fa-${iconClassName} zoom-effect display-mode-icon ${activeType === type ? 'active' : ''}`}
      role='presentation'
    />
  );
  return (
    <div className='display-controls'>
      <Icon
        onChange={onChange}
        type='desktop'
        activeType={type}
        iconClassName='desktop'
      />
      <Icon
        onChange={onChange}
        type='tablet'
        activeType={type}
        iconClassName='tablet-alt'
      />
      <Icon
        onChange={onChange}
        type='mobile'
        activeType={type}
        iconClassName='mobile-alt'
      />
    </div>
  );
};

DisplayModeButtons.propTypes = {

};

export default DisplayModeButtons;
