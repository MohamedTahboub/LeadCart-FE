import React from 'react';
import PropTypes from 'prop-types';

const DeclineButton = ({ value, ...props }) => (
  <div className='upsell-decline-text'>
        No Thanks I'd rather not take the advantage of this offer!
  </div>
);

DeclineButton.propTypes = {
  value: PropTypes.string
};

DeclineButton.defaultProps = {
  value: 'complete the order'
};

export default DeclineButton;
