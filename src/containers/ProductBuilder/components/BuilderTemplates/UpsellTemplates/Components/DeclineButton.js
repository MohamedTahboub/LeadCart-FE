import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
const { EditableField } = common;

const DeclineButton = ({ value, ...props }) => (
  <EditableField className='upsell-decline-text'>
        No Thanks I'd rather not take the advantage of this offer!
  </EditableField>
);

DeclineButton.propTypes = {
  value: PropTypes.string
};

DeclineButton.defaultProps = {
  value: 'complete the order'
};

export default DeclineButton;
