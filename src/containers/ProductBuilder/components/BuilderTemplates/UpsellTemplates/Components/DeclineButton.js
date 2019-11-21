import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
const { EditableField } = common;

const DeclineButton = ({
  product: {
    pagePreferences: {
      declineButtonText
    } = {}
  } = {},
  onChange,
  ...props
}) => (
  <EditableField
    value={declineButtonText}
    onChange={onChange}
    name='pagePreferences.declineButtonText'
    className='upsell-decline-text'
  />
);

DeclineButton.propTypes = {
  value: PropTypes.string
};

DeclineButton.defaultProps = {
  value: 'complete the order'
};

export default DeclineButton;
