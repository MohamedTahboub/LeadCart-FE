import React from 'react';
import PropTypes from 'prop-types';

const Note = ({ value, ...props }) => (
  <div className='upsell-notes-container'>
        This special offer is available on this page only, Click below to upgrade your membership now and claim your three bonuses
  </div>
);

Note.propTypes = {
  value: PropTypes.string
};

Note.defaultProps = {
  value: 'upsell title here'
};

export default Note;
