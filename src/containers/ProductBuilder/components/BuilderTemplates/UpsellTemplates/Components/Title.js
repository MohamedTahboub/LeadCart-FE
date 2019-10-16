import React from 'react';
import PropTypes from 'prop-types';
import EditableField from './EditableField';

const Title = ({ value, ...props }) => {

  const onEdit = (text) => {
    console.log(text)
  }
  return (
    <div className="upsell-title">
      <EditableField onEdited={onEdit} id="title" />
    </div>
  )
};

Title.propTypes = {
  value: PropTypes.string
};

Title.defaultProps = {
  value: 'upsell title here'
};

export default Title;
