import React from 'react';
import PropTypes from 'prop-types';
import EditableField from './EditableField';
const Note = ({ value, ...props }) => (
  <div className='upsell-notes-container'>
    <EditableField  id="note"/>
  </div>
);

Note.propTypes = {
  value: PropTypes.string
};

Note.defaultProps = {
  value: 'upsell title here'
};

export default Note;
