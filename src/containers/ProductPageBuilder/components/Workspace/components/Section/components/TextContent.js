import React from 'react';
import PropTypes from 'prop-types';
import QuillEditor from 'components/QuillEditor';

// value={pagePreferences.description}
// onEdit={onEdit}

const TextContent = (props) => (
  <div {...props}>
    <QuillEditor
      value='Edit Text Here'
      // theme='snow'

    />
  </div>
);

TextContent.propTypes = {

};

export default TextContent;
