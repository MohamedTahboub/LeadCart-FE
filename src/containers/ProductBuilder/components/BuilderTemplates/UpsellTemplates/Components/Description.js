import React from 'react';
import PropTypes from 'prop-types';
import EditableField from './EditableField';

const Description = ({ value, ...props }) => (
  <div className='upsell-description' id="description">
    <EditableField />
  </div>
);

Description.propTypes = {
  value: PropTypes.string
};

Description.defaultProps = {
  value: 'upsell description here'
};

export default Description;
