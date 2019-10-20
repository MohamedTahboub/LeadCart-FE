import React from 'react';
import PropTypes from 'prop-types';
import EditableField from './EditableField';

const Description = ({
  product: {
    pagePreferences
  } = {},
  ...props
}) => {


  const onEdit = (text) => {
    props.onChange({
      target: {
        name: "pagePreferences.description",
        value: text
      }
    })
  }

  return (
    <div className='upsell-description' id="description">
      <EditableField
        value={pagePreferences.description}
        onEdit={onEdit}
      />
    </div>
  )
};

Description.propTypes = {
  value: PropTypes.string
};

Description.defaultProps = {
  value: 'upsell description here'
};

export default Description;
