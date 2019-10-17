import React from 'react';
import PropTypes from 'prop-types';
import EditableField from './EditableField';
const Note = ({ product : {pagePreferences}={}, ...props }) => (
  <div className='upsell-notes-container'>
    <EditableField  value={pagePreferences.description} id="note"/>
  </div>
);

Note.propTypes = {
  value: PropTypes.string
};

Note.defaultProps = {
  value: 'upsell title here'
};

export default Note;
