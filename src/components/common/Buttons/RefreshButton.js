import React from 'react';
import PropTypes from 'prop-types';
import SmallButton from './SmallButton';

const RefreshButton = ({
  onClick,
  loading
}) => (
  <SmallButton
    onClick={onClick}
    disabled={loading}
    className='btn refresh-btn primary-color'
  >
    <i className={`fas fa-sync-alt ${loading ? 'rotate' : ''}`} />
      Sync Now
  </SmallButton>
);


RefreshButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};
RefreshButton.defaultProps = { loading: false };

export default RefreshButton;
